import * as moment from 'moment';

export class CreateMatchController
{
    static $inject = ['$scope', '$http', '$state', 'PATHS', 'LoginService', 'toaster'];

    public match:any = {
        date: new Date((new Date()).getTime() + 24 * 60 * 60 * 1000),
        hour: new Date(moment('15:30','HH:mm')),
        address: '',
        address_lat:'',
        address_lng: '',
        game_level_from: '2.5',
        game_level_to: '2.5',
        type:'single',
        sexo:'mixto'
    };
    public address;
    public map;
    public market;
    public date = new Date((new Date()).getTime() + 24 * 60 * 60 * 1000);

    public mytime = new Date(moment('15:30','HH:mm'));

    public ismeridian = true;

    public timechange(){
        if(this.match.hour.getMinutes() != 0 && this.match.hour.getMinutes() != 30){
            this.toaster.pop({type:'info', body:'Solo se admiten intervalos de 30 minutos.'});
            this.match.hour = new Date(moment('15:30','HH:mm'));
        }
    }


    public stopSave = false;
    constructor($scope, private $http, private $state, private PATHS, private LoginService, private toaster){
        if(!LoginService.isAuth()){
          $state.go('app.home');
        }else if(!LoginService.getUser().complete){
            toaster.pop({type:'error', body:'Debe completar su perfil primero.'});

            $state.go('app.profile');
        }

        this.map = { center: { latitude: -34.6038966, longitude: -58.3817433 }, zoom: 14 };
    }

    public changeAddress(){
        if(this.address.geometry && this.address.geometry.location){
            this.map.center.latitude= this.address.geometry.location.lat();
            this.map.center.longitude= this.address.geometry.location.lng();
            this.market = { latitude: this.address.geometry.location.lat(), longitude: this.address.geometry.location.lng() }
            this.match.address = this.address.formatted_address;
            this.match.address_lat = this.address.geometry.location.lat();
            this.match.address_lng = this.address.geometry.location.lng();
        }
    }

    public validateYears(){

        if(!this.match.years_from || !this.match.years_to){
           return;
        }

        if(this.match.years_from <= 17){
            this.match.years_to = null;
            this.toaster.pop({type:'info', body:'La "Edad desde" debe ser mayor a 17 años.'})
        }
        if(this.match.years_from > 100){
            this.match.years_to = null;
            this.toaster.pop({type:'info', body:'La "Edad desde" debe ser menor a 100 años.'})
        }
        if(this.match.years_from > this.match.years_to){
            this.match.years_to = null;
            this.toaster.pop({type:'info', body:'La "Edad desde" debe ser menor a la "Edad hasta".'})
        }
    }

    public validateLevel(){
        if(this.match.game_level_from > this.match.game_level_to){
            this.match.game_level_to = this.match.game_level_from;
            this.toaster.pop({type:'info', body:'El "Nivel desde" debe ser menor o igual al "Nivel hasta".'})
        }
    }

    public save(form){
        const vm = this;
        if(form.$valid && this.match.years_from > 17 && this.match.years_to<100 && this.match.years_from<=this.match.years_to && !this.stopSave){
            this.stopSave = !this.stopSave;

            this.match.hour = this.match.hour.toLocaleTimeString();
            this.$http.post(this.PATHS.api + '/match', this.match).then(function(resp){
                if(resp.data.success){
                    vm.$state.go('app.suggested_players', {match_id:resp.data.match_id});
                }
            });
        }else{
            this.toaster.pop({type:'info', body:'Debe completar todos los datos.'})
        }
    }
}

angular.module('CreateMatch')
        .controller('CreateMatchController', ['$scope', '$http', '$state', 'PATHS', 'LoginService', 'toaster' ,CreateMatchController]);

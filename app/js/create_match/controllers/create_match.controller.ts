import * as moment from 'moment';



export class CreateMatchController 
{   
    static $inject = ['$scope', '$http', '$state', 'PATHS'];
    
    public match:any = {
        date: new Date(),
        hour: new Date(moment('15:30','HH:mm a')),
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
    constructor($scope, private $http, private $state, private PATHS){
        this.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
        console.log(new Date(moment('15:30','HH:mm a')));
    }

    public changeAddress(){
        if(this.address.geometry && this.address.geometry.location){
            this.map.center.latitude= this.address.geometry.location.lat();
            this.map.center.longitude= this.address.geometry.location.lng();

            this.match.address = this.address.formatted_address;
            this.match.address_lat = this.address.geometry.location.lat();
            this.match.address_lng = this.address.geometry.location.lng();
        }
    }

    public save(form){
        const vm = this;
        if(form.$valid){
            this.$http.post(this.PATHS.api + '/match', this.match).then(function(resp){
                if(resp.data.success){
                    vm.$state.go('app.home');
                }
            });
        }
    }
}

angular.module('CreateMatch')
        .controller('CreateMatchController', ['$scope', '$http', '$state', 'PATHS' ,CreateMatchController]);
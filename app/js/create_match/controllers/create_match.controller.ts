export class CreateMatchController 
{   
    static $inject = ['$scope', '$http', '$state'];

    public match:any = {
        date: new Date(),
        hour: new Date(),
        address: '',
        type:'single',
        sexo:'mixto'
    };
    public address;
    public map;
    constructor($scope, private $http, private $state){
        this.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

    }

    public changeAddress(){
        if(this.address.geometry && this.address.geometry.location){
            this.map.center.latitude= this.address.geometry.location.lat();
            this.map.center.longitude= this.address.geometry.location.lng();
        }
    }

    public save(form){
        debugger;
        if(form.$valid){
            
        }
    }
}

angular.module('CreateMatch')
        .controller('CreateMatchController', ['$scope', '$http', '$state' ,CreateMatchController]);
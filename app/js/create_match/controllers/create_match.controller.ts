export class CreateMatchController 
{   
    static $inject = ['$scope'];

    public match:any = {
        type:'single',
        sexo:'mixto'
    };
    public address;

    constructor($scope){
        
    }
}

angular.module('CreateMatch')
        .controller('CreateMatchController', ['$scope',CreateMatchController]);
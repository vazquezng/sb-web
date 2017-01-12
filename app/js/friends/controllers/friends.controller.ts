export class PlayController 
{   
    static $inject = ['Friends', '$uibModal', '$scope', '$http', 'PATHS'];

    public modalInstance;
    public matchs;
    constructor(private Friends, private $uibModal, private $scope, private $http, private PATHS){
        const vm = this;
        this.friends = Friends.data.friends;
        $scope.close = function(){
            vm.modalInstance.close();
        };
    }
}

angular.module('Home')
        .controller('PlayController', ['Matchs', '$uibModal', '$scope', '$http', 'PATHS' ,PlayController]);
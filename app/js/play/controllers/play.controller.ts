export class PlayController 
{   
    static $inject = ['$uibModal'];
    constructor(private $uibModal){
    }


    public openModalPlay(id){
        let modalInstance = this.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'play-modal',
            //size: 'md'
        });
    }
}

angular.module('Home')
        .controller('PlayController', ['$uibModal',PlayController]);
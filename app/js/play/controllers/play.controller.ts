export class PlayController 
{   
    static $inject = ['$uibModal', '$scope'];

    public modalInstance;
    constructor(private $uibModal, private $scope){
        const vm = this;
        $scope.close = function(){
            vm.modalInstance.close();
        };
    }


    public openModalPlay(id){
        this.modalInstance = this.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'play-modal',
            //size: 'lg'
            scope: this.$scope
        });
    }
}

angular.module('Home')
        .controller('PlayController', ['$uibModal', '$scope',PlayController]);
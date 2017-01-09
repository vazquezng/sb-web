export class PlayController 
{   
    static $inject = ['Matchs', '$uibModal', '$scope', '$http', 'PATHS'];

    public modalInstance;
    public matchs;
    constructor(private Matchs, private $uibModal, private $scope, private $http, private PATHS){
        const vm = this;
        this.matchs = Matchs.data.matchs;
        $scope.close = function(){
            vm.modalInstance.close();
        };
    }

    public openMaps(lat, lng){
        this.$scope.map = { center: { latitude: lat, longitude: lng }, zoom: 16 };
        this.$scope.timestamp = new Date().getTime();
        this.modalInstance = this.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'playmap-modal',
            //size: 'lg'
            scope: this.$scope
        });
    }

    public openModalPlay(match){
        const vm = this;
        this.$scope.match = match;
        this.$scope.map = { center: { latitude: match.address_lat, longitude: match.address_lng }, zoom: 16 };
        this.$scope.timestamp = new Date().getTime();
        this.$scope.play = function(){
            vm.$http.post(vm.PATHS.api + '/match/play', {id: vm.$scope.match.id})
                    .then(function(resp){
                        if(resp.data.success){
                            vm.modalInstance.close();
                        }
                    });
        };
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
        .controller('PlayController', ['Matchs', '$uibModal', '$scope', '$http', 'PATHS' ,PlayController]);
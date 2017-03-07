export class PlayController 
{   
    static $inject = ['Matchs', 'LoginService', '$uibModal', '$scope', '$http', 'PATHS', '$state', 'toaster'];

    public modalInstance;
    public matchs;
    public user;
    public playBtn;

    constructor(private Matchs, private LoginService, private $uibModal, private $scope, private $http, private PATHS, private $state, toaster){
        this.user = LoginService.getUser();
        if(!LoginService.isAuth()){
            $state.go('app.home');
        }else if(!LoginService.getUser().complete){
            toaster.pop({type:'error', body:'Debe completar su perfil primero.'});
          $state.go('app.profile');
        }
        

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
            size: 'lg',
            scope: this.$scope
        });
    }

    public openModalPlay(match){
        const vm = this;
        this.$scope.match = match;
        this.$scope.map = { center: { latitude: match.address_lat, longitude: match.address_lng }, zoom: 16 };
        this.$scope.timestamp = new Date().getTime();
        this.$scope.stopSave = false;
        vm.$http.get(vm.PATHS.api + '/match/players/' + vm.$scope.match.id)
        .then(function(resp){
            match['users'] = resp.data[0].users;
            vm.playBtn = resp.data[1].canPlay;
        });
        
        this.$scope.play = function(){
            if(!vm.$scope.stopSave){
                vm.$scope.stopSave = !vm.$scope.stopSave;
                vm.$http.post(vm.PATHS.api + '/match/play', {id: vm.$scope.match.id})
                .then(function(resp){
                    if(resp.data.success){
                        vm.$scope.stopSave = !vm.$scope.stopSave;
                        vm.modalInstance.close();
                    }
                });
            }
            
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
        .controller('PlayController', ['Matchs','LoginService', '$uibModal', '$scope', '$http', 'PATHS', '$state', 'toaster' ,PlayController]);
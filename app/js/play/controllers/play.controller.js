var PlayController = /** @class */ (function () {
    function PlayController(Matchs, LoginService, $uibModal, $scope, $http, PATHS, $state, toaster) {
        this.Matchs = Matchs;
        this.LoginService = LoginService;
        this.$uibModal = $uibModal;
        this.$scope = $scope;
        this.$http = $http;
        this.PATHS = PATHS;
        this.$state = $state;
        this.toaster = toaster;
        this.user = LoginService.getUser();
        if (!LoginService.isAuth()) {
            $state.go('app.home');
        }
        else if (!LoginService.getUser().complete) {
            toaster.pop({ type: 'error', body: 'Debe completar su perfil primero.' });
            $state.go('app.profile');
        }
        var vm = this;
        this.matchs = Matchs.data.matchs;
        $scope.close = function () {
            vm.modalInstance.close();
        };
    }
    PlayController.prototype.openMaps = function (lat, lng) {
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
    };
    PlayController.prototype.openModalPlay = function (match) {
        var vm = this;
        var myLatLng = { latitude: match.address_lat, longitude: match.address_lng };
        this.$scope.match = match;
        this.$scope.map = { center: myLatLng, zoom: 16 };
        this.$scope.timestamp = new Date().getTime();
        this.$scope.stopSave = false;
        vm.$http.get(vm.PATHS.api + '/match/players/' + vm.$scope.match.id)
            .then(function (resp) {
            match['users'] = resp.data[0].users;
            vm.playBtn = resp.data[1].canPlay;
        });
        this.$scope.play = function () {
            if (!vm.$scope.stopSave) {
                vm.$scope.stopSave = !vm.$scope.stopSave;
                vm.$http.post(vm.PATHS.api + '/match/play', { id: vm.$scope.match.id })
                    .then(function (resp) {
                    if (resp.data.success) {
                        vm.toaster.pop({ type: 'success', body: 'Se envió una solicitud al creador del partido, se te avisará por email cuando éste la acepte o rechace.' });
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
    };
    PlayController.$inject = ['Matchs', 'LoginService', '$uibModal', '$scope', '$http', 'PATHS', '$state', 'toaster'];
    return PlayController;
}());
angular.module('Home')
    .controller('PlayController', ['Matchs', 'LoginService', '$uibModal', '$scope', '$http', 'PATHS', '$state', 'toaster', PlayController]);

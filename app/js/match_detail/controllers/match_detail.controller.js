var MatchDetailController = /** @class */ (function () {
    function MatchDetailController($scope, $http, $state, PATHS, $stateParams, LoginService, toaster) {
        this.$http = $http;
        this.$state = $state;
        this.PATHS = PATHS;
        this.toaster = toaster;
        var vm = this;
        this.user = LoginService.getUser();
        vm.$http.get(vm.PATHS.api + '/match/' + $stateParams.id)
            .then(function (resp) {
            vm.match = resp.data.match;
            vm.isPlayer = resp.data.isPlayer;
            if (vm.match.type == 'singles') {
                vm.match.is_incomplete = vm.match.matchPlayer.length < 2;
            }
            else {
                vm.match.is_incomplete = vm.match.matchPlayer.length < 4;
            }
        });
    }
    MatchDetailController.prototype.acceptUser = function (id_user, id_match) {
        var vm = this;
        var $paramObj = { id_user: id_user, id_match: id_match, state: 'confirmed' };
        this.$http.post(this.PATHS.api + '/match/updatePlayerRequest', $paramObj).then(function (resp) {
            if (resp.data.success) {
                vm.toaster.pop({ type: 'success', body: 'Confirmaste al usuario!', timeout: 2000 });
                vm.$state.go('app.matchHistory');
            }
            else {
                vm.toaster.pop({ type: 'error', body: 'No se pudo confirmar el usuario', timeout: 2000 });
            }
        });
    };
    MatchDetailController.prototype.refuseUser = function (id_user, id_match) {
        var vm = this;
        var $paramObj = { id_user: id_user, id_match: id_match, state: 'rejected' };
        this.$http.post(this.PATHS.api + '/match/updatePlayerRequest', $paramObj).then(function (resp) {
            if (resp.data.success) {
                vm.toaster.pop({ type: 'success', body: 'Rechazaste al usuario!', timeout: 2000 });
                vm.$state.go('app.matchHistory');
            }
            else {
                vm.toaster.pop({ type: 'error', body: 'No se pudo rechazar el usuario', timeout: 2000 });
            }
        });
    };
    MatchDetailController.prototype.acceptMatch = function (id_user, id_match) {
        var vm = this;
        var $paramObj = { id_user: id_user, id_match: id_match, state: 'confirmed' };
        this.$http.post(this.PATHS.api + '/match/updatePlayerRequest', $paramObj).then(function (resp) {
            if (resp.data.success) {
                vm.toaster.pop({ type: 'success', body: 'Confirmaste el partido!', timeout: 2000 });
                vm.$state.go('app.matchHistory');
            }
            else {
                vm.toaster.pop({ type: 'error', body: 'No se pudo confirmar el partido. ' + resp.data.errorMessage, timeout: 2000 });
            }
        });
    };
    MatchDetailController.prototype.refuseMatch = function (id_user, id_match) {
        var vm = this;
        var $paramObj = { id_user: id_user, id_match: id_match, state: 'invitationDeclined' };
        this.$http.post(this.PATHS.api + '/match/updatePlayerRequest', $paramObj).then(function (resp) {
            if (resp.data.success) {
                vm.toaster.pop({ type: 'success', body: 'Rechazaste el partido!', timeout: 2000 });
                vm.$state.go('app.matchHistory');
            }
            else {
                vm.toaster.pop({ type: 'error', body: 'No se pudo rechazar el partido', timeout: 2000 });
            }
        });
    };
    MatchDetailController.prototype.createFeedback = function (match_id, user_id) {
        var vm = this;
        vm.$state.go('app.feedback', { match_id: match_id, user_id: user_id });
    };
    MatchDetailController.$inject = ['$scope', '$http', '$state', 'PATHS', '$stateParams', 'LoginService', 'toaster'];
    return MatchDetailController;
}());
angular.module('MatchDetail')
    .controller('MatchDetailController', ['$scope', '$http', '$state', 'PATHS', '$stateParams', 'LoginService', 'toaster', MatchDetailController]);

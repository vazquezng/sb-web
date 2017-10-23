var SuggestedPlayersController = /** @class */ (function () {
    function SuggestedPlayersController(Players, $scope, $http, $stateParams, PATHS, toaster) {
        this.Players = Players;
        this.$scope = $scope;
        this.$http = $http;
        this.$stateParams = $stateParams;
        this.PATHS = PATHS;
        this.toaster = toaster;
        this.users = Players.data.players;
        this.other_players = Players.data.other_players;
        this.match_id = $stateParams.match_id;
    }
    SuggestedPlayersController.prototype.invite = function (user) {
        var vm = this;
        var paramObj = { user_id: user.id, match_id: this.match_id };
        user['disabled'] = 'true';
        this.$http.post(this.PATHS.api + '/match/invite', paramObj).then(function (resp) {
            if (resp.data.success) {
                vm.toaster.pop({ type: 'info', body: 'Invitación enviada.' });
            }
            else {
                vm.toaster.pop({ type: 'warn', body: resp.data.errorMessage });
            }
        });
    };
    SuggestedPlayersController.$inject = ['Players', '$scope', '$http', '$stateParams', 'PATHS', 'toaster'];
    return SuggestedPlayersController;
}());
angular.module('SuggestedPlayers')
    .controller('SuggestedPlayersController', ['Players', '$scope', '$http', '$stateParams', 'PATHS', 'toaster', SuggestedPlayersController]);

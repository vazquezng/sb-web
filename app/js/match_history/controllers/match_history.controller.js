var MatchHistoryController = /** @class */ (function () {
    function MatchHistoryController(Matches, $state) {
        this.Matches = Matches;
        this.$state = $state;
        var vm = this;
        this.matches = Matches.data.matches;
    }
    MatchHistoryController.prototype.showDetail = function (id) {
        var vm = this;
        vm.$state.go('app.match_detail', { id: id });
    };
    MatchHistoryController.$inject = ['Matches', '$state'];
    return MatchHistoryController;
}());
angular.module('MatchHistory')
    .controller('MatchHistoryController', ['Matches', '$state', MatchHistoryController]);

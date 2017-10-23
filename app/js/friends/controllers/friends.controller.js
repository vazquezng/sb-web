var FriendsController = /** @class */ (function () {
    function FriendsController(Friends, $scope, $http, PATHS) {
        this.Friends = Friends;
        this.$scope = $scope;
        this.$http = $http;
        this.PATHS = PATHS;
        var vm = this;
        this.users = Friends.data.users;
    }
    FriendsController.$inject = ['Friends', '$scope', '$http', 'PATHS'];
    return FriendsController;
}());
angular.module('Friends')
    .controller('FriendsController', ['Friends', '$scope', '$http', 'PATHS', FriendsController]);

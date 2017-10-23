var MenuController = /** @class */ (function () {
    function MenuController(LoginService, $rootScope, $scope) {
        this.LoginService = LoginService;
        this.user = LoginService.getUser();
        this.avatar = LoginService.isAuth() && this.user.image && this.user.image !== '' ? this.user.image : window.URL_BUCKET + '/img/profile/profile-blank.png';
        var vm = this;
        $rootScope.$on('login', function () {
            vm.user = LoginService.getUser();
            vm.avatar = vm.user.image && vm.user.image !== '' ? vm.user.image : window.URL_BUCKET + '/img/profile/profile-blank.png';
        });
        $rootScope.$on('profile-update', function () {
            vm.user = LoginService.getUser();
            vm.avatar = vm.user.image && vm.user.image !== '' ? vm.user.image : window.URL_BUCKET + '/img/profile/profile-blank.png';
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    }
    MenuController.prototype.logout = function () {
        this.LoginService.logout();
    };
    MenuController.prototype.auth = function () {
        this.LoginService.init();
    };
    MenuController.$inject = [' LoginService', '$rootScope', '$scope'];
    return MenuController;
}());
angular.module('Home')
    .controller('MenuController', ['LoginService', '$rootScope', '$scope', MenuController]);

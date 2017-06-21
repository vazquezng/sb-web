import * as angular from 'angular';

class MenuController
{
    static $inject = [' LoginService', '$rootScope', '$scope'];

    public user;
    public avatar;
    constructor(private LoginService, $rootScope, $scope){
        this.user = LoginService.getUser();
        this.avatar = LoginService.isAuth() && this.user.image && this.user.image !== '' ? this.user.image : (<any>window).URL_BUCKET+'/img/profile/profile-blank.png';
        const vm = this;
        $rootScope.$on('login', function(){
            vm.user = LoginService.getUser();

            vm.avatar = vm.user.image && vm.user.image !== '' ? vm.user.image : (<any>window).URL_BUCKET+'/img/profile/profile-blank.png';
        });
        $rootScope.$on('profile-update', () => {
          vm.user = LoginService.getUser();
          vm.avatar = vm.user.image && vm.user.image !== '' ? vm.user.image : (<any>window).URL_BUCKET+'/img/profile/profile-blank.png';
          if(!$scope.$$phase) {
            $scope.$apply();
          }
        });
    }

    public logout(){
        this.LoginService.logout();
    }

    public auth(){
       this.LoginService.init();
    }
}

angular.module('Home')
        .controller('MenuController', ['LoginService', '$rootScope', '$scope', MenuController]);

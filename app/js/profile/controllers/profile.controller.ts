class ProfileController {
    static $inject = ['LoginService', '$http', '$state'];

    public user;
    constructor (private LoginService, private $http, private $state){
        this.user = LoginService.getUser();
    }

    public save(){
        this.LoginService.setUser(this.user);
        this.$state.reload();
    }
}


angular.module('Profile')
    .controller('ProfileController', ['LoginService', '$http', '$state', ProfileController]);



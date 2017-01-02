import * as angular from 'angular';

export class LoginController 
{   
    static $inject = ['$http','PATHS', 'LoginService', '$auth'];
    private params = {};
    constructor(private $http, private PATHS, private LoginService, private $auth){
    }

    public authenticate = function(provider:string){
       this[provider]();
    }

    private facebook = function(){
        const vm = this;
        (<any>window).FB.login(function(response){
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                vm.getUserFacebook(response.authResponse);
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    }

    private twitter(){
        (<any>window).location = (<any>window).API_URL.replace('/api/v1', '') + '/auth/twitter' ;
    }

    private getUserFacebook(authResponse){
        const vm = this;
        (<any>window).FB.api('/me', {
            fields: 'first_name, last_name, email'
        }, function(response) {
            (<any>vm).params = response;
            (<any>vm).params.accessToken = authResponse.accessToken;
            (<any>vm).params.provider = 'facebook';
            vm.$http.post(vm.PATHS.api + '/auth', vm.params).then(function(resp){
                vm.LoginService.login(resp.data);
            }); 
        });
    }
}

class AuthTwitterController{
    static $inject = ['User', 'LoginService', '$stateParams'];

    constructor(private User, private LoginService, private $stateParams){
        let data:any = {};

        data.user = User.data.user;
        data.token = {token: $stateParams.token};
        if($stateParams.newuser == 'true'){
            data.newuser =true;
        }else{
            data.newuser = false;
            data.state = 'app.home';
        }
         
        LoginService.login(data);
    }
}

angular.module('Login')
        .controller('LoginController', ['$http', 'PATHS', 'LoginService', '$auth', LoginController])
        .controller('AuthTwitterController', ['User', 'LoginService', '$stateParams', AuthTwitterController]);
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
        (<any>window).FB.getLoginStatus(function(response) {
            console.log(response);
            if (response.status === 'connected') {
                console.log('Logged in.');
                vm.getUserFacebook(response.authResponse);
            }else {
                (<any>window).FB.login(function(response){
                    if (response.authResponse) {
                        console.log('Welcome!  Fetching your information.... ');
                        vm.getUserFacebook(response.authResponse);
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                });
            }
        });
    }

    private twitter(){
        (<any>window).location = (<any>window).API_URL.replace('/api/v1', '') + '/auth/twitter' ;
    }

    private getUserFacebook(authResponse){
        const vm = this;
        (<any>window).FB.api('/me', {
            fields: ['first_name','last_name', 'email']
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

angular.module('Login')
        .controller('LoginController', ['$http', 'PATHS', 'LoginService', '$auth', LoginController]);
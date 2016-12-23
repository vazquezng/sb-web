import * as angular from 'angular';

export class LoginController 
{   
    static $inject = ['$auth'];
    private $auth;
    constructor($auth){
        this.$auth = $auth;
    }

    public authenticate = function(provider:string){
        this.$auth.authenticate(provider).then(function(response) {
          console.log(response);
        })
        .catch(function(response) {
          console.log(response);
        });
    }
}

angular.module('Login')
        .controller('LoginController', ['$auth', LoginController]);
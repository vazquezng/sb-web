import * as angular from 'angular';

export class LoginController
{
    static $inject = ['$http','PATHS', 'LoginService', '$auth'];
    private params = {};
    private auth2;
    constructor(private $http, private PATHS, private LoginService, private $auth){
      this.startGoogle();
    }

    public authenticate = function(provider:string){
       this[provider]();
    }
    public onSignIn = function() {
      const vm = this;
    }
    private startGoogle = function () {
      const vm = this;
      (<any>window).gapi.load('auth2', function(){
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        vm.auth2 = (<any>window).gapi.auth2.init({
          client_id: '931016694606-bj35ac8hq9kumjvm0nd4plb9lfngeit5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        vm.attachSignin(document.getElementById('googleSignin'));
      });
    }
    private attachSignin = function (element) {
      console.log(element.id);
      const vm = this;
      this.auth2.attachClickHandler(element, {},
      function(googleUser) {
        const user = {
          id: googleUser.getBasicProfile().getId(),
          first_name: googleUser.getBasicProfile().getGivenName(),
          last_name: googleUser.getBasicProfile().getFamilyName(),
          image: googleUser.getBasicProfile().getImageUrl(),
          email: googleUser.getBasicProfile().getEmail(),
        };
        vm.$http.post(vm.PATHS.api + '/auth', user).then(function(resp){
            vm.LoginService.login(resp.data);
        });
        console.log(googleUser.getBasicProfile());
      }, function(error) {
        alert(JSON.stringify(error, undefined, 2));
      });
    }
    // When callback is received, process user info.
    private userInfoCallback = function(userInfo) {
      console.log(userInfo);
    };

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
            fields: 'first_name, last_name, email, picture'
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

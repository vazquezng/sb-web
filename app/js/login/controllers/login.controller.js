var LoginController = /** @class */ (function () {
    function LoginController($http, PATHS, LoginService, toaster, $auth) {
        this.$http = $http;
        this.PATHS = PATHS;
        this.LoginService = LoginService;
        this.toaster = toaster;
        this.$auth = $auth;
        this.params = {};
        this.authenticate = function (provider) {
            this[provider]();
        };
        this.onSignIn = function () {
            var vm = this;
        };
        this.startGoogle = function () {
            var vm = this;
            window.gapi.load('auth2', function () {
                // Retrieve the singleton for the GoogleAuth library and set up the client.
                vm.auth2 = window.gapi.auth2.init({
                    client_id: '931016694606-bj35ac8hq9kumjvm0nd4plb9lfngeit5.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin',
                });
                vm.attachSignin(document.getElementById('googleSignin'));
            });
        };
        this.attachSignin = function (element) {
            console.log(element.id);
            var vm = this;
            this.auth2.attachClickHandler(element, {}, function (googleUser) {
                var user = {
                    id: googleUser.getBasicProfile().getId(),
                    first_name: googleUser.getBasicProfile().getGivenName(),
                    last_name: googleUser.getBasicProfile().getFamilyName(),
                    image: googleUser.getBasicProfile().getImageUrl(),
                    email: googleUser.getBasicProfile().getEmail()
                };
                vm.$http.post(vm.PATHS.api + '/auth/google', user).then(function (resp) {
                    vm.LoginService.login(resp.data);
                    if (!resp.data.success && resp.data.errorMessage) {
                        vm.toaster.pop({ type: 'error', body: resp.data.errorMessage });
                    }
                    else {
                        vm.LoginService.login(resp.data);
                    }
                });
                console.log(googleUser.getBasicProfile());
            }, function (error) {
                alert(JSON.stringify(error, undefined, 2));
            });
        };
        // When callback is received, process user info.
        this.userInfoCallback = function (userInfo) {
            console.log(userInfo);
        };
        this.facebook = function () {
            var vm = this;
            window.FB.login(function (response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    vm.getUserFacebook(response.authResponse);
                }
                else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        };
        this.startGoogle();
    }
    LoginController.prototype.twitter = function () {
        window.location = window.API_URL.replace('/api/v1', '') + '/auth/twitter';
    };
    LoginController.prototype.getUserFacebook = function (authResponse) {
        var vm = this;
        window.FB.api('/me', {
            fields: 'first_name, last_name, email, picture'
        }, function (response) {
            vm.params = response;
            vm.params.accessToken = authResponse.accessToken;
            vm.params.provider = 'facebook';
            vm.$http.post(vm.PATHS.api + '/auth', vm.params).then(function (resp) {
                if (!resp.data.success && resp.data.errorMessage) {
                    console.log(resp.data);
                    vm.toaster.pop({ type: 'error', body: resp.data.errorMessage });
                }
                else {
                    vm.LoginService.login(resp.data);
                }
            });
        });
    };
    LoginController.$inject = ['$http', 'PATHS', 'LoginService', 'toaster', '$auth'];
    return LoginController;
}());
var AuthTwitterController = /** @class */ (function () {
    function AuthTwitterController(User, LoginService, $stateParams) {
        this.User = User;
        this.LoginService = LoginService;
        this.$stateParams = $stateParams;
        var data = {};
        data.user = User.data.user;
        data.token = { token: $stateParams.token };
        if ($stateParams.newuser == 'true') {
            data.newuser = true;
        }
        else {
            data.newuser = false;
            data.state = 'app.home';
        }
        LoginService.login(data);
    }
    AuthTwitterController.$inject = ['User', 'LoginService', '$stateParams'];
    return AuthTwitterController;
}());
angular.module('Login')
    .controller('LoginController', ['$http', 'PATHS', 'LoginService', 'toaster', '$auth', LoginController])
    .controller('AuthTwitterController', ['User', 'LoginService', '$stateParams', AuthTwitterController]);

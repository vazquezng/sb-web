import angular = require('angular');
import { APP } from './config.ts';


(<any>window).DEV = true;
//Start by defining the main module and adding the module dependencies
angular.module(APP.NAME, APP.DEPENDENCIES)
.constant('PATHS', {
        api: (<any>window).API_URL
    })
    .config(['$httpProvider', '$locationProvider', '$urlRouterProvider', function($httpProvider, $locationProvider, $urlRouterProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        
        //$locationProvider.html5Mode(true).hashPrefix('*');
        $urlRouterProvider.otherwise('/');
    }])
    .config(['$authProvider', 'PATHS', function($authProvider, PATHS){
      $authProvider.httpInterceptor = function() { return true; },
      $authProvider.withCredentials = false;
      $authProvider.tokenRoot = null;
      $authProvider.baseUrl = '/';
      $authProvider.loginUrl = '/auth/login';
      $authProvider.signupUrl = '/auth/signup';
      $authProvider.unlinkUrl = '/auth/unlink/';
      $authProvider.tokenName = 'token';
      $authProvider.tokenPrefix = 'satellizer';
      $authProvider.tokenHeader = 'Authorization';
      $authProvider.tokenType = 'Bearer';
      $authProvider.storageType = 'localStorage';

      $authProvider.facebook({
        clientId: '188438681613821',
        name: 'facebook',
        url: PATHS.api + '/auth/facebook',
        authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
        redirectUri: window.location.origin + '/auth/facebook/facebook/callback',
        requiredUrlParams: ['display', 'scope'],
        scope: ['email'],
        scopeDelimiter: ',',
        display: 'popup',
        oauthType: '2.0',
        popupOptions: { width: 580, height: 400 }
      });
      // Twitter
      $authProvider.twitter({
        url: '/auth/twitter',
        authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
        redirectUri: window.location.origin,
        oauthType: '1.0',
        popupOptions: { width: 495, height: 645 }
      });
    }])
    .run(['$rootScope','$state', function($rootScope, $state){
        //If the route change failed due to authentication error, redirect them out
        $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
            if(rejection === 'Not Authenticated'){
                $state.go('login');
            }
        });
    }]);

if (!(<any>window).DEV) {
  angular.module(APP.NAME).config(['$compileProvider', function($compileProvider){
    $compileProvider.debugInfoEnabled(false);
  }]);
}

//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_') {
    window.location.hash = '#!';
  }

  //Then init the app
  angular.bootstrap(document, [APP.NAME], {
    strictDi: true
  });
});

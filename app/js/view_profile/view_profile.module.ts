import * as angular from 'angular';
import "angular-ui-router";
import { APP } from '../core/config.ts';

APP.ADD_MODULE('Profile',['Login']);

import './controllers/view_profile.controller';
angular
  .module('Profile')
  .config(['$stateProvider', function($stateProvider){
    const tplAppProfile = <string> require('./views/view_profile.html');
    $stateProvider.state('app.profile', {
        url: '/view_profile',
        template: tplAppProfile,
        controller: 'ProfileController',
        controllerAs: 'vm',
        resolve:{
          Canchas:['$http', 'PATHS', function($http, PATHS){
            return $http.get(`${PATHS.api}/canchas`);
          }],
        },
        authenticate: true,
    });
    /*$stateProvider.state('app.profile', {
        url: '/view_profile/:id',
        template: tplMatchDetail,
        controller: 'ProfileController',
        controllerAs: 'vm',
        resolve:{
          Load: ['$http', '$state', 'PATHS', '$stateParams', function($http, $state, PATHS, $stateParams){
            return $http.get(PATHS.api + '/feedback/detail/' + $stateParams.match_id + '/' + $stateParams.user_id);
          }]
        }
    });*/
  }]);

angular
  .module('Profile').directive('file', function() {
  return {
        require:"ngModel",
        restrict: 'A',
        link: function($scope, el, attrs, ngModel){
            el.bind('change', function(event){
                var files = (<any>event).target.files;
                var file = files[0];

                (<any>ngModel).$setViewValue(file);
                $scope.$apply();
            });
        }
    };
});

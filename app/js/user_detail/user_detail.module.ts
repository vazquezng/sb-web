import * as angular from 'angular';
import "angular-ui-router";
import { APP } from '../core/config.ts';

APP.ADD_MODULE('UserDetail');

import './controllers/user_detail.controller.ts';
angular
  .module('UserDetail')
  .config(['$stateProvider', function($stateProvider){
    const tplUserDetail = <string> require('./views/user_detail.html');
    $stateProvider.state('app.user_detail', {
        url: '/user-detail/:user_id',
        template: tplUserDetail,
        controller: 'UserDetailController',
        controllerAs: 'vm',
        resolve:{
          Load: ['$http', '$state', 'PATHS', '$stateParams', function($http, $state, PATHS, $stateParams){
            return $http.get(PATHS.api + '/user/' + $stateParams.user_id);
          }]
        }
    });
  }]);
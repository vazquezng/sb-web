import * as angular from 'angular';
import "angular-ui-router";
import { APP } from '../core/config.ts';

APP.ADD_MODULE('Friends');

import './controllers/friends.controller.ts';

angular
  .module('Friends')
  .config(['$stateProvider', function($stateProvider){
    const tplAppPlay = <string> require('./views/friends.html');
    $stateProvider.state('app.play', {
        url: '/friends',
        template: tplAppPlay,
        controller: 'FriendsController',
        controllerAs: 'vm',
        resolve:{
          Matchs:['$http', 'PATHS', function($http, PATHS){
            return $http.get(PATHS.api + '/friends');
          }]
        }
    });
  }]);
import * as angular from 'angular';
import "angular-ui-router";
import { APP } from '../core/config.ts';

APP.ADD_MODULE('Play');

import './controllers/play.controller.ts';

angular
  .module('Play')
  .config(['$stateProvider', function($stateProvider){
    const tplAppPlay = <string> require('./views/play.html');
    $stateProvider.state('app.play', {
        url: '/play',
        template: tplAppPlay,
        controller: 'PlayController',
        controllerAs: 'vm',
        resolve:{
          Matchs:['$http', 'PATHS', function($http, PATHS){
            return $http.get(PATHS.api + '/match');
          }]
        }
    });
  }]);
import { APP } from '../core/config.ts';

APP.ADD_MODULE('Courts');

import './controllers/courts.controller.ts';

angular
  .module('Courts')
  .config(['$stateProvider', function($stateProvider){
    const tplApp = <string> require('./views/courts.html');
    $stateProvider.state('app.canchas', {
        url: '/canchas',
        template: tplApp,
        controller: 'CourtsController',
        controllerAs: 'vm',
        resolve:{
          Canchas:['$http', 'PATHS', function($http, PATHS){
            return $http.get(PATHS.api + '/canchas');
          }]
        }
    });
  }]);
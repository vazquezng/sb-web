import { APP } from '../core/config.ts';

APP.ADD_MODULE('Achievements');

import './controllers/achievements.controller.ts';

angular
  .module('Achievements')
  .config(['$stateProvider', function($stateProvider){
    const tplApp = <string> require('./views/achievements.html');
    $stateProvider.state('app.logros', {
        url: '/logros',
        template: tplApp,
        controller: 'AchievementsController',
        controllerAs: 'vm',
        resolve:{
          Logros:['$http', 'PATHS', function($http, PATHS){
            return $http.get(PATHS.api + '/match');
          }]
        }
    });
  }]);
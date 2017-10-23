import * as angular from 'angular';
import "angular-ui-router";
import { APP } from '../core/config.ts';

APP.ADD_MODULE('SuggestedPlayers');

import './controllers/suggested_players.controller';

angular
  .module('SuggestedPlayers')
  .config(['$stateProvider', function($stateProvider){
    const tplAppSuggestedPlayers = <string> require('./views/suggested_players.html');
    $stateProvider.state('app.suggested_players', {
        url: '/suggested-players/:match_id',
        template: tplAppSuggestedPlayers,
        controller: 'SuggestedPlayersController',
        controllerAs: 'vm',
        resolve:{
          Players:['$http', '$stateParams', 'PATHS', function($http, $stateParams, PATHS){
            return $http.get(PATHS.api + '/match/suggested_players/' + $stateParams.match_id);
          }]
        }
    })
  }]);

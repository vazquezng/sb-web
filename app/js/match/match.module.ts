import * as angular from 'angular';
import "angular-ui-router";
import { APP } from '../core/config.ts';

APP.ADD_MODULE('Match');

angular
  .module('Match')
  .config(['$stateProvider', function($stateProvider){
    const tplAppMatch = <string> require('./views/match.html');
    $stateProvider.state('app.match', {
        url: '/match',
        template: tplAppMatch,
        //controller: 'LoginController',
        //controllerAs: 'vm'
    });
  }]);
import * as angular from 'angular';
import "angular-ui-router";
import { APP } from '../core/config.ts';

APP.ADD_MODULE('CreateMatch');

angular
  .module('CreateMatch')
  .config(['$stateProvider', function($stateProvider){
    const tplAppCreateMatch = <string> require('./views/create_match.html');
    $stateProvider.state('app.createMatch', {
        url: '/create_match',
        template: tplAppCreateMatch,
        //controller: 'LoginController',
        //controllerAs: 'vm'
    });
  }]);
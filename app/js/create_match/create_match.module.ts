import * as angular from 'angular';
import "angular-ui-router";
import { APP } from '../core/config.ts';

APP.ADD_MODULE('CreateMatch');

import './controllers/create_match.controller.ts';
angular
  .module('CreateMatch')
  .config(['$stateProvider', function($stateProvider){
    const tplAppCreateMatch = <string> require('./views/create_match.html');
    $stateProvider.state('app.createMatch', {
        url: '/create-match',
        template: tplAppCreateMatch,
        controller: 'CreateMatchController',
        controllerAs: 'vm'
    });
  }]);
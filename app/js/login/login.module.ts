import * as angular from 'angular';
import "angular-ui-router";
import { APP } from '../core/config.ts';

APP.ADD_MODULE('Login');

import './controllers/login.controller.ts';
angular
  .module('Login')
  .config(['$stateProvider', function($stateProvider){
    const tplAppLogin = <string> require('./views/login.html');
    $stateProvider.state('login', {
        url: '/login',
        template: tplAppLogin,
        controller: 'LoginController',
        controllerAs: 'vm'
    });
  }]);
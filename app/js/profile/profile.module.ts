import * as angular from 'angular';
import "angular-ui-router";
import { APP } from '../core/config.ts';

APP.ADD_MODULE('Profile',['Login']);

import './controllers/profile.controller.ts';
angular
  .module('Profile')
  .config(['$stateProvider', function($stateProvider){
    const tplAppProfile = <string> require('./views/profile.html');
    $stateProvider.state('app.profile', {
        url: '/profile',
        template: tplAppProfile,
        controller: 'ProfileController',
        controllerAs: 'vm'
    });
  }]);
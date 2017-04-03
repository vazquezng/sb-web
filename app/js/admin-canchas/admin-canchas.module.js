import * as angular from 'angular';
import "angular-ui-router";
import { APP } from '../core/config.ts';

APP.ADD_MODULE('AdminCanchas');

require('./controllers/login.controller.js');
require('./controllers/admin-canchas.controller.js');

angular
  .module('AdminCanchas')
  .config(['$stateProvider', function($stateProvider){
    const tplCanchasLogin = require('./views/canchas-login.html');
    const tplCanchasCreate = require('./views/canchas-create.html');
    $stateProvider.state('app.admin-canchas', {
        url: '/admin-canchas',
        template: tplCanchasLogin,
        controller: 'CanchasLoginController',
        controllerAs: 'vm'
    }).state('app.admin-canchas-crear', {
        url: '/admin-canchas/create',
        template: tplCanchasCreate,
        controller: 'CanchasCreateController',
        controllerAs: 'vm'
    });
  }]);
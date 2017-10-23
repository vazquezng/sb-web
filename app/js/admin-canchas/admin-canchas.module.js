import * as angular from 'angular';
import 'angular-ui-router';
import { APP } from '../core/config.ts';

APP.ADD_MODULE('AdminCanchas');

require('./controllers/login.controller');
require('./controllers/admin-canchas.controller');

angular
  .module('AdminCanchas')
  .config(['$stateProvider', ($stateProvider) => {
    const tplCanchasLogin = require('./views/canchas-login.html');
    const tplCanchasCreate = require('./views/canchas-create.html');
    const tplCanchasProfile = require('./views/canchas-profile.html');
    $stateProvider.state('app.admin-canchas', {
      url: '/admin-canchas',
      template: tplCanchasLogin,
      controller: 'CanchasLoginController',
      controllerAs: 'vm',
    }).state('app.admin-canchas-crear', {
      url: '/admin-canchas/create',
      template: tplCanchasCreate,
      controller: 'CanchasCreateController',
      controllerAs: 'vm',
    })
      .state('app.admin-canchas-profile', {
        url: '/admin-canchas/profile',
        template: tplCanchasProfile,
        controller: 'CanchasProfileController',
        controllerAs: 'vm',
      });
  }]);

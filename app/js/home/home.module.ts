import * as angular from 'angular';
import "angular-ui-router";
import { APP } from '../core/config.ts';

APP.ADD_MODULE('Home');

import './controllers/home.controller.ts';
import './controllers/menu.controller.ts';

import './directives/welcome.directive.ts';
import './directives/want-to-play.directive.ts';
import './directives/sb-sections.directive.ts';
import './directives/footer.directive.ts';

angular
  .module('Home')
  .config(['$stateProvider', function($stateProvider){
    const tplApp = <string> require('./views/app.html');
    const tplHome = <string> require('./views/home.html');
    $stateProvider
    .state('app', {
        abstact: true,
        template: tplApp,
        controller: 'MenuController',
        controllerAs: 'vm'
    })
    .state('app.home', {
        url: '/',
        template: tplHome,
        controller: 'HomeController',
        controllerAs: 'vm'
    });
  }]);
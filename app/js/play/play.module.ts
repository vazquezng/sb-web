import * as angular from 'angular';
import "angular-ui-router";
import { APP } from '../core/config.ts';

APP.ADD_MODULE('Play');

angular
  .module('Play')
  .config(['$stateProvider', function($stateProvider){
    const tplAppPlay = <string> require('./views/play.html');
    $stateProvider.state('app.play', {
        url: '/play',
        template: tplAppPlay,
        //controller: 'LoginController',
        //controllerAs: 'vm'
    });
  }]);
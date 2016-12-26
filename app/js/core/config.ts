import angular = require('angular');
import "angular-ui-router";
import "satellizer";
import * as router from "angular-ui-router";
import * as moment from 'moment';
import "angular-ui-bootstrap";

moment.locale('es');

const NAME = 'ST-WEB';

const APP  = {
  NAME: NAME,
  DEPENDENCIES: ['ui.router', 'satellizer', 'ui.bootstrap'],
  ADD_MODULE: function (moduleName:string, dependencies?) {
    angular.module(moduleName, dependencies || []);
    angular.module(NAME).requires.push(moduleName);
  }
};

export {APP};

import angular = require('angular');
import * as moment from 'moment';
(<any>window)._ = require('lodash');

import "angular-ui-router";
import "satellizer";
import "angular-ui-bootstrap";
import 'angular-google-places-autocomplete';
import 'ng-file-upload';

import 'angularjs-slider';
import 'angular-simple-logger';
import 'angular-google-maps'; 



require('angular-ui-bootstrap/dist/ui-bootstrap-tpls.js');

moment.locale('es');

const NAME = 'ST-WEB';

const APP  = {
  NAME: NAME,
  DEPENDENCIES: ['ui.router', 'ui.bootstrap', 'satellizer', 'google.places', 'ngFileUpload', 'rzModule', 'uiGmapgoogle-maps'],
  ADD_MODULE: function (moduleName:string, dependencies?) {
    angular.module(moduleName, dependencies || []);
    angular.module(NAME).requires.push(moduleName);
  }
};

export {APP};

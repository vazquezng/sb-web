import angular from 'angular';

const HomeCtr = /** @class */ (function () {
  function HomeController() {
  }
  HomeController.$inject = [];
  return HomeController;
}());

angular.module('Home')
  .controller('HomeController', [HomeCtr]);

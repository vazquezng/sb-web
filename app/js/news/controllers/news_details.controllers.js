import angular from 'angular';

const NewsDetailsCtrl = /** @class */ (function () {
  function NewsDetailsController($state) {

  }
  NewsDetailsController.$inject = ['$state'];
  return NewsDetailsController;
}());

angular.module('News')
  .controller('NewsDetailsController', ['$state', NewsDetailsCtrl]);

import * as angular from 'angular';
import 'angular-ui-router';
import { APP } from '../core/config.ts';

console.log(APP);

APP.ADD_MODULE('News');

// import './controllers/news_details.controllers';

angular
  .module('News')
  .config(['$stateProvider', ($stateProvider) => {
    const tplNewsList = require('./views/newsList.html');
    const tplNewsDetails = require('./views/newsDetails.html');
    $stateProvider.state('app.news', {
      url: '/news',
      template: tplNewsList,
      controller: ['News', '$state', '$stateParams', function (News, $state, $stateParams) {
        const vm = this;
        vm.news = News.data.news.reverse().filter(n => n.status === 1);
      }],
      controllerAs: 'vm',
      resolve: {
        News: ['$http', 'PATHS', ($http, PATHS) => $http.get(`${PATHS.api}/news`)],
      },
    })
      .state('app.newsDetails', {
        url: '/news/:id',
        template: tplNewsDetails,
        controller: ['News', '$state', '$stateParams', function (News, $state, $stateParams) {
          const vm = this;
          News.data.news.forEach((n, i) => {
            if (n.id == $stateParams.id) {
              vm.newsDetails = News.data.news[i];
            }
          });
        }],
        controllerAs: 'vm',
        resolve: {
          News: ['$http', 'PATHS', ($http, PATHS) => $http.get(`${PATHS.api}/news`)],
        },
      });
  }]);

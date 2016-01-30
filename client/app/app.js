'use strict';

angular.module('elsieyApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'restangular'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    app.use(favicon(__dirname + '/public/favicon.ico'));

    $locationProvider.html5Mode(true);
  });

'use strict';

angular.module('elsieyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('eng', {
        url: '/eng?section/:id',
        templateUrl: 'app/eng/eng.html',
        controller: 'EngCtrl'
      });
  });

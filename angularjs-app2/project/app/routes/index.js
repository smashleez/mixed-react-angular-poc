'use strict';
var angular = require('angular');

var appName = 'availity.clientOnboarding.routes';
var app = angular.module(appName, [
  require('./home').name
])
  .constant('name', appName)
  .config(['$urlRouterProvider', function($urlRouterProvider) {
    $urlRouterProvider.otherwise('');
  }])
  .config(require('./app.routes.js'));


module.exports = app;

'use strict';
var angular = require('angular');

var appName = 'availity.clientOnboarding.routes.ceet';
var app = angular.module(appName, [
])
  .constant('name', appName)
  .config(require('./app.routes.js'));


module.exports = app;

'use strict';

var angular = require('angular');

var moduleName = 'availity.home';
var app = angular.module(moduleName, [
  'availity.rcm',
  'availity.rcm.ui',
  'availity',
  'availity.ui',
]);

module.exports = app;

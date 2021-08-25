'use strict';

var angular = require('angular');

var moduleName = 'availity.clientOnboarding.resources';
var app = angular.module(moduleName, [
  'availity.rcm',
  'availity.rcm.ui'
])
  .constant('name', moduleName)
  .factory('AvProvidersResource', require('./api-providers.js'))
  .factory('AvEnrollmentsResource', require('./api-enrollments.js'))
  .factory('AvOfficeOptionsResource', require('./api-office-options.js'))
  .factory('AvPayersResource', require('./api-payers.js'))
  .factory('AvAuthenticationResource', require('./api-authentication.js'))
  .factory('AvEnrollmentPaperworkUploadResource', require('./api-enrollment-paperwork-upload.js'))
  .factory('AvEnrollmentPaperworkDownloadResource', require('./api-enrollment-paperwork-download.js'))
  .factory('AvEnrollmentTemplates', require('./api-enrollment-templates.js'))
  .factory('AvEnrollmentTemplatesResource', require('./api-enrollment-templates-resource.js'))
  .factory('AvUserResource', require('./api-user-resource.js'))
  .factory('AvEnrollmentScreenReportResource', require('./api-enrollment-screen-report-resource.js'))
  .factory('AvProviderNumberResource', require('./api-provider-number-resource.js'));

module.exports = app;

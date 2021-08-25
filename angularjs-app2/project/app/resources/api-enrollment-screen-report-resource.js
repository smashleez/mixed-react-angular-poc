'use strict';

var angular = require('angular');

AvEnrollmentScreenReportResourceFactory.$inject = ['AvApiResource', 'AvQueryService'];
function AvEnrollmentScreenReportResourceFactory(AvApiResource, AvQueryService) {

  var AvEnrollmentScreenReportResource = function() {
    AvApiResource.call(this, {version: '/v1', url: '/enrollment-screen-report/download-token', cache: false});
  };

  var _instance = new AvEnrollmentScreenReportResource();

  angular.extend(AvEnrollmentScreenReportResource.prototype, AvApiResource.prototype, {
    getEnrollmentScreenReportToken: getEnrollmentScreenReportToken
  });

  return _instance;

  function getEnrollmentScreenReportToken(searchCriteria, sortBy, sortDirection) {
    var tempSearchCriteria = searchCriteria || {};

    return AvQueryService.getRecords(_instance, tempSearchCriteria, sortBy, sortDirection);
  }
}

module.exports = AvEnrollmentScreenReportResourceFactory;

'use strict';

var angular = require('angular');

AvEnrollmentPaperworkUploadResourceFactory.$inject = ['$q', 'AvApiResource', 'AvUploadService'];
function AvEnrollmentPaperworkUploadResourceFactory($q, AvApiResource, AvUploadService) {

  var AvEnrollmentPaperworkUploadResource = function() {
    AvApiResource.call(this, {version: '/v1', url: '/enrollment-paperwork', cache: false});
  };

  var _instance = new AvEnrollmentPaperworkUploadResource();

  angular.extend(AvEnrollmentPaperworkUploadResource.prototype, AvApiResource.prototype, {
    uploadPaperwork: uploadPaperwork
  });

  return _instance;

  function uploadPaperwork(file, enrollmentId) {
    if (!enrollmentId) {
      return $q.reject('enrollment argument is required');
    }
    return AvUploadService.uploadWithId(_instance, enrollmentId, file);
  }
}

module.exports = AvEnrollmentPaperworkUploadResourceFactory;

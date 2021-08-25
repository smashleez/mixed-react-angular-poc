'use strict';

var angular = require('angular');

AvEnrollmentPaperworkDownloadResourceFactory.$inject = ['$q', 'AvApiResource', 'AvFileDownloadService', 'AvQueryService'];
function AvEnrollmentPaperworkDownloadResourceFactory($q, AvApiResource, AvFileDownloadService, AvQueryService) {

  var AvEnrollmentPaperworkDownloadResource = function() {
    AvApiResource.call(this, {version: '/v1', url: '/enrollment-paperwork', cache: false});
  };

  var _instance = new AvEnrollmentPaperworkDownloadResource();

  angular.extend(AvEnrollmentPaperworkDownloadResource.prototype, AvApiResource.prototype, {
    downloadPaperwork: downloadPaperwork,
    downloadReceivedPaperwork: downloadReceivedPaperwork
  });

  return _instance;

  function downloadPaperwork(enrollments, providerId) {
    if (!enrollments) {
      return $q.reject('At least one enrollmentId argument is required');
    }

    if (!providerId) {
      return $q.reject('providerId argument is required');
    }

    var searchConfig = {
      enrollments: {
        field: 'enrollmentIds'
      },
      providerId: {
        field: 'providerId'
      },
      limit: {
        value: undefined
      },
      offset: {
        value: undefined
      },
      usePostGet: true
    };

    searchConfig.enrollments.value = enrollments;
    searchConfig.providerId.value = providerId;

    var tokenPromise = AvQueryService.getRecords(new AvApiResource({version: '/v1', url: '/enrollment-paperwork/download-token', cache: false}), searchConfig);
    AvFileDownloadService.download(tokenPromise, false);
    return tokenPromise;
  }

  function downloadReceivedPaperwork(enrollmentId, enrollmentNoteId) {
    var self = this;
    var params = {enrollmentId: enrollmentId, enrollmentNoteId: enrollmentNoteId};
    var tokenPromise =  self.get('/received/download-token', {params: params});
    AvFileDownloadService.download(tokenPromise, false);
    return tokenPromise;
  }
}

module.exports = AvEnrollmentPaperworkDownloadResourceFactory;

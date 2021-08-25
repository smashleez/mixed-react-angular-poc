'use strict';

var angular = require('angular');

AvEnrollmentsResourceFactory.$inject = ['$q', 'AvApiResource', 'AvQueryService', 'AvFileDownloadService'];
function AvEnrollmentsResourceFactory($q, AvApiResource, AvQueryService) {

  var AvEnrollmentsResource = function() {
    AvApiResource.call(this, {version: '/v1', url: '/enrollments', cache: false});
  };

  var _instance = new AvEnrollmentsResource();

  angular.extend(AvEnrollmentsResource.prototype, AvApiResource.prototype, {
    getEnrollments: getEnrollments,
    getEnrollmentsByProviderId: getEnrollmentsByProviderId,
    addNewEnrollment: addNewEnrollment,
    addNote: addNote,
    updateEnrollment: updateEnrollment,
    deleteEnrollment: deleteEnrollment
  });

  return _instance;

  function addNewEnrollment(enrollment) {
    if (!enrollment) {
      return $q.reject('enrollment argument is required');
    }

    if (!enrollment.providerId) {
      return $q.reject('providerId argument is required');
    }

    return _instance.create(enrollment);
  }

  function addNote(note, providerId) {
    if (!providerId) {
      return $q.reject('providerId argument is required');
    }

    if (!note) {
      return $q.reject('note argument is required');
    }

    if (!note.enrollmentId) {
      return $q.reject('enrollmentId argument is required');
    }

    return _instance.createWithId(note.enrollmentId + '/notes', note, { params: {providerId: providerId} });
  }

  function deleteEnrollment(enrollment, providerId) {
    if (!enrollment) {
      return $q.reject('enrollment argument is required');
    }

    if (!providerId) {
      return $q.reject('providerId argument is required');
    }

    return _instance.remove(enrollment.id, { params: {providerId: providerId} });
  }

  function getEnrollments(searchCriteria, sortBy, sortDirection) {

    var tempSearchCriteria = searchCriteria || {};

    return AvQueryService.getRecords(_instance, tempSearchCriteria, sortBy, sortDirection);
  }

  function getEnrollmentsByProviderId(providerId, searchCriteria, sortBy, sortDirection) {
    var tempSearchCriteria = searchCriteria;
    if (!providerId) {
      return $q.reject('providerId argument is required');
    }

    // Status and Step are in the same stepId search dropdown, so if Rejected is selected we must populate the Status search criteria instead of the step.
    if (searchCriteria.stepId  && searchCriteria.stepId.value && searchCriteria.stepId.value.selectType === 'status') {
      tempSearchCriteria.status.value = searchCriteria.stepId.value;
      tempSearchCriteria.stepId.value = undefined;
    }

    tempSearchCriteria = tempSearchCriteria || {};
    tempSearchCriteria.providerId = {field: 'providerId', value: providerId};

    return AvQueryService.getRecords(_instance, tempSearchCriteria, sortBy, sortDirection);
  }

  function updateEnrollment(enrollment, providerId) {
    if (!enrollment) {
      return $q.reject('enrollment argument is required');
    }

    if (!providerId) {
      return $q.reject('providerId argument is required');
    }

    return _instance.update(enrollment.id, enrollment, { params: {providerId: providerId} });
  }
}

module.exports = AvEnrollmentsResourceFactory;

'use strict';

var angular = require('angular');

AvPayersResourceFactory.$inject = ['$q', 'AvApiResource', 'AvQueryService'];
function AvPayersResourceFactory($q, AvApiResource, AvQueryService) {

  var AvPayersResource = function() {
    AvApiResource.call(this, {version: '/v1', url: '/payers', cache: false});
  };

  var _instance = new AvPayersResource();

  angular.extend(AvPayersResource.prototype, AvApiResource.prototype, {
    getPayers: getPayers,
    getPayerFunctionTypes: getPayerFunctionTypes,
    getPayersByTerm: getPayersByTerm
  });

  return _instance;

  function getPayers(term, offset, limit) {
    var searchCriteria = {
      limit: {field: 'limit', value: limit},
      offset: {field: 'offset', value: offset},
      name: {field: 'name', value: term}
    };

    return AvQueryService.getRecords(_instance, searchCriteria);
  }

  function getPayersByTerm(term, offset, limit) {

    var searchCriteria = {
      limit: {field: 'limit', value: limit},
      offset: {field: 'offset', value: offset},
      name: {field: 'term', value: term}
    };

    return AvQueryService.getRecords(_instance, searchCriteria);
  }

  function getPayerFunctionTypes(payerId) {
    if (!payerId) {
      return $q.reject('payerId argument is required');
    }

    return _instance.get(payerId + '/functionTypes');
  }
}

module.exports = AvPayersResourceFactory;

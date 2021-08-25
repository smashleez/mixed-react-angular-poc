'use strict';

var angular = require('angular');

AvProvidersResourceFactory.$inject = ['$q', 'AvApiResource', 'AvQueryService'];
function AvProvidersResourceFactory($q, AvApiResource, AvQueryService) {

  var AvProvidersResource = function() {
    AvApiResource.call(this, {version: '/v1', url: '/providers', cache: false});
  };

  var _instance = new AvProvidersResource();

  angular.extend(AvProvidersResource.prototype, AvApiResource.prototype, {
    deleteProvider: deleteProvider,
    getProviders: getProviders,
    getProviderById: getProviderById,
    saveProvider: saveProvider
  });

  return _instance;

  function getProviders(searchCriteria, sortField, sortAsc) {
    return AvQueryService.getRecords(_instance, searchCriteria, sortField, sortAsc);
  }

  function getProviderById(providerId) {
    if (!providerId) {
      return $q.reject('providerId argument is required');
    }

    return _instance.get(providerId);
  }

  function saveProvider(provider) {
    if (!provider) {
      return $q.reject('provider argument is required');
    }

    if (provider.id) {
      return _instance.update(provider.id, provider);
    }
    return _instance.create(provider);
  }

  function deleteProvider(provider) {
    if (!provider) {
      return $q.reject('provider argument is required');
    }
    return _instance.remove(provider.id);
  }
}

module.exports = AvProvidersResourceFactory;

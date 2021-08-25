'use strict';

var angular = require('angular');

AvOfficeOptionsResourceFactory.$inject = ['$q', 'AvApiResource'];
function AvOfficeOptionsResourceFactory($q, AvApiResource) {

  var AvOfficeOptionsResource = function() {
    AvApiResource.call(this, {version: '/v1', url: '/preferences', cache: false});
  };

  var _instance = new AvOfficeOptionsResource();

  angular.extend(AvOfficeOptionsResource.prototype, AvApiResource.prototype, {
    getPreferenceById: getPreferenceById
  });

  return _instance;

  function getPreferenceById(optionCode) {
    if (!optionCode) {
      return $q.reject('optionCode argument is required');
    }

    return _instance.get(optionCode);
  }
}

module.exports = AvOfficeOptionsResourceFactory;

'use strict';

var angular = require('angular');

AvUserResourceFactory.$inject = ['AvApiResource'];
function AvUserResourceFactory(AvApiResource) {

  var AvUserResource = function() {
    AvApiResource.call(this, {version: '/v1', url: '/users', suffix: '/me', cache: false});
  };

  var _instance = new AvUserResource();

  angular.extend(AvUserResource.prototype, AvApiResource.prototype, {
    getCurrentUser: getCurrentUser
  });

  return _instance;

  function getCurrentUser() {
    return _instance.query({});
  }
}

module.exports = AvUserResourceFactory;

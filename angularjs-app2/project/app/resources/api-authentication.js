'use strict';

var angular = require('angular');

AvAuthenticationResourceFactory.$inject = ['AvApiResource', '$q'];
function AvAuthenticationResourceFactory(AvApiResource, $q) {

  var AvAuthenticationResource = function() {
    AvApiResource.call(this, {version: '/v1', url: '/sso', cache: false});
  };

  var _instance = new AvAuthenticationResource();

  angular.extend(AvAuthenticationResource.prototype, AvApiResource.prototype, {
    singleSignOn: singleSignOn
  });

  return _instance;

  function singleSignOn(token) {
    if (!token) {
      return $q.reject('token argument is required');
    }

    return _instance.query({params: {token: token}});
  }
}

module.exports = AvAuthenticationResourceFactory;

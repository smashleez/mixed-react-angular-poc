'use strict';

AvProviderNumberResourceFactory.$inject = ['AvApiResource'];
function AvProviderNumberResourceFactory(AvApiResource) {

  var AvProviderNumberResource = function(suffix) {
    if (suffix) {
      return new AvApiResource({version: '/v1', url: '/payers', cache: false, suffix: suffix});
    }
    return new AvApiResource({version: '/v1', url: '/payers', cache: false});
  };

  return AvProviderNumberResource;
}

module.exports = AvProviderNumberResourceFactory;

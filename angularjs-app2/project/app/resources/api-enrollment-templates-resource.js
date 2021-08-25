'use strict';

AvEnrollmentTemplatesResourceFactory.$inject = ['AvApiResource'];
function AvEnrollmentTemplatesResourceFactory(AvApiResource) {

  var AvEnrollmentTemplatesResource = function(suffix) {
    if (suffix) {
      return new AvApiResource({version: '/v1', url: '/templates', cache: false, suffix: suffix});
    }
    return new AvApiResource({version: '/v1', url: '/templates', cache: false});
  };

  return AvEnrollmentTemplatesResource;
}

module.exports = AvEnrollmentTemplatesResourceFactory;

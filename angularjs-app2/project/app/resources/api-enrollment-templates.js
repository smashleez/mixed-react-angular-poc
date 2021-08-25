'use strict';

AvEnrollmentTemplatesFactory.$inject = ['$q', 'AvEnrollmentTemplatesResource', 'AvQueryService', 'AvEnrollmentsResource'];
function AvEnrollmentTemplatesFactory($q, AvEnrollmentTemplatesResource, AvQueryService, AvEnrollmentsResource) {

  var AvEnrollmentTemplatesService = function() {
    this.applyTemplate = applyTemplate;
    this.createTemplate = createTemplate;
    this.createTemplateDetail = createTemplateDetail;
    this.expireTemplate = expireTemplate;
    this.expireTemplateDetail = expireTemplateDetail;
    this.getTemplates = getTemplates;
    this.getTemplateDetails = getTemplateDetails;
    this.save = save;
    this.updateTemplate = updateTemplate;
  };

  return new AvEnrollmentTemplatesService();

  function applyTemplate(templateId, providerId) {
    return AvEnrollmentsResource.create({
      templateId: templateId,
      providerId: providerId
    });
  }

  function createTemplate(template) {
    if (!template) {
      return $q.reject('template argument is required');
    }

    return new AvEnrollmentTemplatesResource().create(template);
  }

  function createTemplateDetail(templateDetail) {
    if (!templateDetail) {
      return $q.reject('template detail argument is required');
    }

    return new AvEnrollmentTemplatesResource('/' + templateDetail.templateId + '/details').create(templateDetail);
  }

  function expireTemplate(template) {
    if (!template) {
      return $q.reject('template argument is required');
    }

    template.expireDate = new Date();

    return new AvEnrollmentTemplatesResource().update(template);
  }

  function expireTemplateDetail(templateId, templateDetail) {
    if (!templateId) {
      return $q.reject('templateId argument is required');
    }

    if (!templateDetail) {
      return $q.reject('template detail argument is required');
    }

    return new AvEnrollmentTemplatesResource('/' + templateId + '/details').update(templateId, templateDetail.templateDetailId, templateDetail);
  }

  function getTemplates() {
    return new AvEnrollmentTemplatesResource().query()
      .then(function(response) {
        return response.data;
      });
  }

  function getTemplateDetails(templateId, searchCriteria, sortBy, sortAsc) {
    if (!templateId) {
      return $q.reject('templateId argument is required');
    }

    var queryStringParms = {
      params: AvQueryService.buildQueryParams(searchCriteria, sortBy, sortAsc)
    };

    return new AvEnrollmentTemplatesResource('/' + templateId + '/details').query(queryStringParms)
      .then(function(response) {
        return response.data;
      });
  }

  function save(template) {
    if (template.templateId) {
      return updateTemplate(template);
    }
    return createTemplate(template);
  }

  function updateTemplate(template) {
    if (!template) {
      return $q.reject('template argument is required');
    }

    return new AvEnrollmentTemplatesResource().update(template);
  }
}

module.exports = AvEnrollmentTemplatesFactory;

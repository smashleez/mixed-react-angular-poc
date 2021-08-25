'use strict';

var _ = require('lodash');

function configureValidation(avValProvider) {

  var contactRules = {
    'firstName': {
      'required': {
        'message': 'First Name is required'
      }
    },
    'lastName': {
      'required': {
        'message': 'Last Name is required'
      }
    },
    'phone': {
      'phone': {
        'message': 'Phone Number is not a valid format'
      }
    },
    'fax': {
      'phone': {
        'message': 'Fax Number is not a valid format'
      }
    },
    'email': {
      'email': {
        'message': 'Email Address is an invalid format'
      }
    }
  };

  var addressRules = {
    'line1': {
      'required': {
        'message': 'Line 1 is required'
      }
    },
    'city': {
      'required': {
        'message': 'City is required'
      }
    },
    'state': {
      'required': {
        'message': 'State is required'
      }
    },
    'zipcode': {
      'required': {
        'message': 'ZIP Code is required'
      },
      'pattern': {
        'value': /^[0-9]*$/,
        'message': 'ZIP Code must be numeric'
      }
    }
  };

  var providerRules = {
    'providerName': {
      'required': {
        'message': 'Provider Name is required'
      }
    },
    'taxId': {
      'required': {
        'message': 'Tax ID is required'
      },
      'size': {
        'min': 9,
        'max': 9,
        'message': 'Tax ID must be 9 digits in length'
      },
      'pattern': {
        'value': /^[0-9]*$/,
        'message': 'Tax ID must be numeric'
      }
    },
    'npi': {
      'required': {
        'message': 'NPI is required'
      },
      'npi': {
        'message': 'NPI is not in the correct format'
      }
    }
  };

  var providerNumberRules = {
    'providerNumber': {
      'required': {
        'message': 'This item is required'
      }
    }
  };

  var supportTicketRules = {
    'category': {
      'required': {
        'message': 'Category is required.'
      }
    },
    'problemDescription': {
      'required': {
        'message': 'Problem description is required.'
      }
    },
    'maskedPhone': {
      'required': {
        'message': 'Phone is required.'
      }
    },
    'email': {
      'required': {
        'message': 'Email is required.'
      }
    },
    'preferredContactMethod': {
      'required': {
        'message': 'Preferred contact method is required.'
      }
    }
  };

  var templateRules = {
    'templateName': {
      'required': {
        'message': 'Template Name is required'
      },
      'pattern': {
        'value': "/^[a-zA-Z0-9\\s\\_\\\-'\\\\/]{1,100}$/",
        'message': 'Template Name cannot contain special characters.'
      }
    },
    'payerName': {
      'required': {
        'message': 'Payer is required'
      }
    }
  };

  providerRules = _.merge(contactRules, providerRules);
  providerRules = _.merge(addressRules, providerRules);

  avValProvider.addRules({
    'providerRules': providerRules,
    'contactRules': contactRules,
    'templateRules': templateRules,
    'supportTicketRules': supportTicketRules,
    'providerNumberRules': providerNumberRules
  });
}

module.exports = configureValidation;

'use strict';

require('./index.less');
require('jquery');

var _ = require('lodash');

if (!_.inherit) {
  _.mixin({
    'inherit': function(child, base, props) {
      child.prototype = _.create(base.prototype, _.assign({
        '_super': base.prototype,
        'constructor': child
      }, props));
      return child;
    }
  });
}

var app = require('./module');

app.addModules([
  'ui.router',
  'availity',
  'availity.ui',
  'availity.ui.templates',
  'availity.rcm',
  'availity.rcm.ui',
  'availity.rcm.notification',
  require('./routes').name,
  require('./home').name
]);


app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

app.run(function($state) {
  console.log('hi');
  $state.go = (state, params, options) => {
    console.log('hijacked ui router');
  }
});

module.exports = app;

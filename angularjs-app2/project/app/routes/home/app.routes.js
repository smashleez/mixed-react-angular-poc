'use strict';


configureRoutes.$inject = ['$stateProvider'];
function configureRoutes($stateProvider) {
  var shouldConfigureRoute = true;

  if (shouldConfigureRoute) {
    $stateProvider
      .state('home', {
        url: '/my-app-1',
        template: require('../../home/home.html')
      });
  }
}

module.exports = configureRoutes;

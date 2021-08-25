'use strict';

AvIndexController.$inject = [
  '$rootScope',
  '$scope',
  '$state'
];
function AvIndexController($rootScope, $scope, $state) {
  $scope.state = $state;
  $scope.displayNavigation = false;
  $scope.isRouteLoading = false;

  this.$onInit = function() {
    _registerEvents();
  };

  function _registerEvents() {
    $rootScope.$on('av:lazy-load-module:start', _onFileDownloadStart);
    $rootScope.$on('av:lazy-load-module:success', _onFileDownloadEnd);
    $rootScope.$on('av:lazy-load-module:error', _onFileDownloadEnd);
    $rootScope.$on('$stateChangeSuccess', _onStateChangeSuccess);
  }

  function _onFileDownloadEnd() {
    $scope.isRouteLoading = false;
  }

  function _onFileDownloadStart() {
    $scope.isRouteLoading = true;
  }

  function _onStateChangeSuccess(event, currentState) {
    _setDisplayNavigation(currentState);
  }

  function _setDisplayNavigation(currentState) {
    var displayNavigation = true;

    if (currentState.data && currentState.data.displayNavigation !== undefined) {
      displayNavigation = !!currentState.data.displayNavigation;
    }

    $scope.displayNavigation = displayNavigation;
  }
}


module.exports = AvIndexController;

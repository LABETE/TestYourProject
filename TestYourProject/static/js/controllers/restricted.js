'use strict';

/**
 * @ngdoc function
 * @name angularDjangoRegistrationAuthApp.controller:RestrictedCtrl
 * @description
 * # RestrictedCtrl
 * Controller of the angularDjangoRegistrationAuthApp
 */
angular.module('authApp')
  .controller('RestrictedCtrl', function ($scope, $state) {
    $scope.$on('djangoAuth.logged_in', function() {
      $state.go('/');
    });
  });

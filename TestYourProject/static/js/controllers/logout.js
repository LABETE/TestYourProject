'use strict';

angular.module('authApp')
  .controller('LogoutCtrl', function ($scope, $state, djangoAuth) {
    djangoAuth.logout();
  });

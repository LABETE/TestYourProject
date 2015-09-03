'use strict';

angular.module('authApp')
  .controller('VerifyemailCtrl', function ($scope, $stateParams, djangoAuth) {
    djangoAuth.verify($stateParams["emailVerificationToken"]).then(function(data){
    	$scope.success = true;
    },function(data){
    	$scope.failure = false;
    });
  });

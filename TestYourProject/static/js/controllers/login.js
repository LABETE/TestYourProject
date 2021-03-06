'use strict';

angular.module('authApp')
  .controller('LoginCtrl', function ($scope, $state, djangoAuth, Validate) {
    $scope.model = {'username':'','password':''};
  	$scope.complete = false;
    $scope.login = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.login($scope.model.username, $scope.model.password)
        .then(function(data){
        	// success case
        	$state.go("projects");
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      }
    }
  });

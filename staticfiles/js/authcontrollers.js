'use strict';

angular.module('authApp')
  .controller('MainCtrl', function ($scope, $cookies, $location, djangoAuth) {
    
    $scope.login = function(){
      djangoAuth.login(prompt('Username'),prompt('password'))
      .then(function(data){
        handleSuccess(data);
      },handleError);
    }
    
    $scope.logout = function(){
      djangoAuth.logout()
      .then(handleSuccess,handleError);
    }
    
    $scope.resetPassword = function(){
      djangoAuth.resetPassword(prompt('Email'))
      .then(handleSuccess,handleError);
    }
    
    $scope.register = function(){
      djangoAuth.register(prompt('Username'),prompt('Password'),prompt('Email'))
      .then(handleSuccess,handleError);
    }
    
    $scope.verify = function(){
      djangoAuth.verify(prompt("Please enter verification code"))
      .then(handleSuccess,handleError);
    }
    
    $scope.goVerify = function(){
      $location.path("/verifyEmail/"+prompt("Please enter verification code"));
    }
    
    $scope.changePassword = function(){
      djangoAuth.changePassword(prompt("Password"), prompt("Repeat Password"))
      .then(handleSuccess,handleError);
    }
    
    $scope.profile = function(){
      djangoAuth.profile()
      .then(handleSuccess,handleError);
    }
    
    $scope.updateProfile = function(){
      djangoAuth.updateProfile({'first_name': prompt("First Name"), 'last_name': prompt("Last Name"), 'email': prompt("Email")})
      .then(handleSuccess,handleError);
    }
    
    $scope.confirmReset = function(){
      djangoAuth.confirmReset(prompt("Code 1"), prompt("Code 2"), prompt("Password"), prompt("Repeat Password"))
      .then(handleSuccess,handleError);
    }

    $scope.goConfirmReset = function(){
      $location.path("/passwordResetConfirm/"+prompt("Code 1")+"/"+prompt("Code 2"))
    }
    
    var handleSuccess = function(data){
      $scope.response = data;
    }
    
    var handleError = function(data){
      $scope.response = data;
    }

    $scope.show_login = true;
    $scope.$on("djangoAuth.logged_in", function(data){
      $scope.show_login = false;
    });
    $scope.$on("djangoAuth.logged_out", function(data){
      $scope.show_login = true;
    });

  }).controller('LoginCtrl', function ($scope, $location, djangoAuth, Validate) {
    $scope.model = {'username':'','password':''};
  	$scope.complete = false;
    $scope.login = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.login($scope.model.username, $scope.model.password)
        .then(function(data){
        	// success case
        	$location.path("/");
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      }
    }
  }).controller('AuthrequiredCtrl', function ($scope) {
    $scope.awesomeThings = [
      'AngularJS',
    ];
  }).controller('LogoutCtrl', function ($scope, $location, djangoAuth) {
    djangoAuth.logout();
  }).controller('MasterCtrl', function ($scope, $location, djangoAuth) {
    // Assume user is not logged in until we hear otherwise
    $scope.authenticated = false;
    // Wait for the status of authentication, set scope var to true if it resolves
    djangoAuth.authenticationStatus(true).then(function(){
        $scope.authenticated = true;
    });
    // Wait and respond to the logout event.
    $scope.$on('djangoAuth.logged_out', function() {
      $scope.authenticated = false;
    });
    // Wait and respond to the log in event.
    $scope.$on('djangoAuth.logged_in', function() {
      $scope.authenticated = true;
    });
    // If the user attempts to access a restricted page, redirect them back to the main page.
    $scope.$on('$routeChangeError', function(ev, current, previous, rejection){
      console.error("Unable to change routes.  Error: ", rejection)
      $location.path('/restricted').replace();
    });
  }).controller('PasswordchangeCtrl', function ($scope, djangoAuth, Validate) {
    $scope.model = {'new_password1':'','new_password2':''};
  	$scope.complete = false;
    $scope.changePassword = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.changePassword($scope.model.new_password1, $scope.model.new_password2)
        .then(function(data){
        	// success case
        	$scope.complete = true;
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      }
    }
  }).controller('PasswordresetCtrl', function ($scope, djangoAuth, Validate) {
    $scope.model = {'email':''};
  	$scope.complete = false;
    $scope.resetPassword = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.resetPassword($scope.model.email)
        .then(function(data){
        	// success case
        	$scope.complete = true;
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      }
    }
  }).controller('PasswordresetconfirmCtrl', function ($scope, $routeParams, djangoAuth, Validate) {
    $scope.model = {'new_password1':'','new_password2':''};
  	$scope.complete = false;
    $scope.confirmReset = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.confirmReset($routeParams['firstToken'], $routeParams['passwordResetToken'], $scope.model.new_password1, $scope.model.new_password2)
        .then(function(data){
        	// success case
        	$scope.complete = true;
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      }
    }
  }).controller('RegisterCtrl', function ($scope, djangoAuth, Validate) {
  	$scope.model = {'username':'','password':'','email':''};
  	$scope.complete = false;
    $scope.register = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.register($scope.model.username,$scope.model.password1,$scope.model.password2,$scope.model.email)
        .then(function(data){
        	// success case
        	$scope.complete = true;
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      }
    }
  }).controller('RestrictedCtrl', function ($scope, $location) {
    $scope.$on('djangoAuth.logged_in', function() {
      $location.path('/');
    });
  }).controller('UserprofileCtrl', function ($scope, djangoAuth, Validate) {
    $scope.model = {'first_name':'','last_name':'','email':''};
  	$scope.complete = false;
  	djangoAuth.profile().then(function(data){
  		$scope.model = data;
  	});
    $scope.updateProfile = function(formData, model){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.updateProfile(model)
        .then(function(data){
        	// success case
        	$scope.complete = true;
        },function(data){
        	// error case
        	$scope.error = data;
        });
      }
    }
  }).controller('VerifyemailCtrl', function ($scope, $routeParams, djangoAuth) {
    djangoAuth.verify($routeParams["emailVerificationToken"]).then(function(data){
    	$scope.success = true;
    },function(data){
    	$scope.failure = false;
    });
  });
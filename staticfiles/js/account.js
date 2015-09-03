'use strict';

angular.module('authApp', [
  'ui.router',
  'ngCookies',
  'ngResource',
  'ngSanitize',
]);

angular.module('authApp')
  .config(function ($stateProvider, $resourceProvider, $httpProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'static/templates/account/main.html',
        controller: 'MainCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .state('register', {
        url: '/register',
        templateUrl: 'static/templates/account/register.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .state('passwordReset', {
        url: '/reset_password',
        templateUrl: 'static/templates/account/passwordreset.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .state('passwordResetConfirm', {
        url: '/reset_password_confirmation/:firstToken/:passwordResetToken',
        templateUrl: 'static/templates/account/passwordresetconfirm.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'static/templates/account/login.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .state('verifyEmail', {
        url: '/verifyEmail/:emailVerificationToken',
        templateUrl: 'static/templates/account/verifyemail.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'static/templates/account/logout.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .state('userProfile', {
        url: '/userProfile',
        templateUrl: 'static/templates/account/userprofile.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .state('passwordChange', {
        url: '/passwordChange',
        templateUrl: 'static/templates/account/passwordchange.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .state('restricted', {
        url: '/restricted',
        templateUrl: 'static/templates/account/restricted.html',
        controller: 'RestrictedCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .state('authRequired', {
        url: '/authRequired',
        templateUrl: 'static/templates/account/authrequired.html',
        controller: 'AuthrequiredCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      });
  })
  .run(function(djangoAuth){
    djangoAuth.initialize('//127.0.0.1:8000/rest-auth', false);
  });

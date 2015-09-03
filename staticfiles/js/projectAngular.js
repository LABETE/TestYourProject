angular.module('projectApp', ['ui.router', 'ngSanitize', 'ui.select', 'ui.bootstrap', 'ngResource', 'projectApp.controllers', 'projectApp.services']);

angular.module('projectApp').config(function ($stateProvider, $resourceProvider, $httpProvider) {
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
		$resourceProvider.defaults.stripTrailingSlashes = false;
		$stateProvider.state('projects', {
			url: '/projects',
			templateUrl: 'static/templates/projects_list.html',
			controller: 'ProjectListController'
		}).state('detailProject', {
			url: '/projects/:id/detail',
			templateUrl: 'static/templates/projects_detail.html',
			controller: 'ProjectDetailController'
		}).state('createProject', {
			url: '/projects/create',
			templateUrl: 'static/templates/projects_create.html',
			controller: 'ProjectCreateController'
		}).state('editProject', {
			url: '/projects/:id/edit',
			templateUrl: 'static/templates/projects_edit.html',
			controller: 'ProjectEditController'
		});
}).run(function ($state) {
	$state.go('projects');
});

angular.module('userApp', ['ui.router','ngResource', 'userApp.controllers', 'userApp.services']);

angular.module('userApp').config(function ($stateProvider, $resourceProvider, $httpProvider) {
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	$resourceProvider.defaults.stripTrailingSlashes = false;
	$httpProvider.defaults.headers.common['Authentication'] = 'authentication';
	$resourceProvider.defaults.stripTrailingSlashes = false;
	$stateProvider.state('users', {
		url: '/users',
		templateUrl: 'static/templates/users_list.html',
		controller: 'UserListController'
	}).state('detailUser', {
		url: '/:id/detail',
		templateUrl: 'static/templates/users_detail.html',
		controller: 'UserDetailController'
	}).state('createUser', {
		url: '/registration',
		templateUrl: 'static/tempaltes/registration.html',
		controller: 'UserCreateController'
	}).state('editUser', {
		url: '/:id/edit',
		templateUrl: 'static/templates/users_edit.html',
        controller: 'UserEditController'
	});
});

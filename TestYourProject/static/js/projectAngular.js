// module dependencies
angular.module('projectApp', ['ui.router', 'ngSanitize', 'ui.select', 'ui.bootstrap', 'ngResource', 'projectApp.controllers', 'projectApp.services']);

angular.module('projectApp').config(function ($stateProvider, $resourceProvider, $httpProvider) {
		// security django for send the requests
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
		// requirement for compatibility with django
		$resourceProvider.defaults.stripTrailingSlashes = false;
		// Url states
		$stateProvider.state('projects', {
			url: '/projects',
			templateUrl: 'static/templates/projects/projects_list.html',
			controller: 'ProjectListController'
		}).state('detailProject', {
			url: '/projects/:id/detail',
			templateUrl: 'static/templates/projects/projects_detail.html',
			controller: 'ProjectDetailController'
		}).state('createProject', {
			url: '/projects/create',
			templateUrl: 'static/templates/projects/projects_create.html',
			controller: 'ProjectCreateController'
		}).state('editProject', {
			url: '/projects/:id/edit',
			templateUrl: 'static/templates/projects/projects_edit.html',
			controller: 'ProjectEditController'
		}).state('cases', {
			url: '/projects/:id/cases',
			templateUrl: 'static/templates/cases/cases_list.html',
			controller: 'CaseListController'
		}).state('detailCase', {
			url: '/projects/:id/cases/:caseid/detail',
			templateUrl: 'static/templates/cases/cases_detail.html',
			controller: 'CaseDetailController'
		}).state('createCase', {
			url: '/projects/:id/cases/create',
			templateUrl: 'static/templates/cases/cases_create.html',
			controller: 'CaseCreateController'
		}).state('editCase', {
			url: '/projects/:id/cases/:caseid/edit',
			templateUrl: 'static/templates/cases/cases_edit.html',
			controller: 'CaseEditController'
		}).state('defects', {
			url: '/defects',
			templateUrl: 'static/templates/defects/defects_list.html',
			controller: 'DefectListController'
		}).state('detailDefect', {
			url: '/defects/:defectid/detail',
			templateUrl: 'static/templates/defects/defects_detail.html',
			controller: 'DefectDetailController'
		}).state('createDefect', {
			url: '/defects/create',
			templateUrl: 'static/templates/defects/defects_create.html',
			controller: 'DefectCreateController'
		}).state('editDefect', {
			url: '/defects/:defectid/edit',
			templateUrl: 'static/templates/defects/defects_edit.html',
			controller: 'DefectEditController'
		}).state('caseDetails', {
			url: '/projects/:id/cases/:caseid',
			templateUrl: 'static/templates/casedetails/casedetails_form.html',
			controller: 'CaseDetailListController'
		});
});

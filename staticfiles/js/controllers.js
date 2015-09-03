angular.module('projectApp.controllers', []).controller('ProjectListController', function ($scope, $state, popupService, $window, Project) {
	$scope.projects = Project.query();

	$scope.deleteProject = function(project) {
		if (popupService.showPopup('Are you sure you want to delete this project?')) {
			project.$delete(function () {
				$window.location.href = '';
			});
		}
	};
}).controller('ProjectDetailController', function ($scope, $stateParams, Project) {
	$scope.project = Project.get({id: $stateParams.id});
}).controller('ProjectCreateController', function ($scope, $state, $stateParams, Project) {
	$scope.project = new Project();

	$scope.createProject = function () {
		$scope.project.$save(function () {
			$state.go('projects');
		});
	};
}).controller('ProjectEditController', function ($scope, $state, $stateParams, Project) {
	$scope.updateProject = function () {
		$scope.project.$update(function () {
			$state.go('projects');
		});
	};

	$scope.loadProject = function () {
		$scope.project = Project.get({id: $stateParams.id});
	};

	$scope.loadProject();
}).controller('Datepicker', function ($scope) {
	$scope.format = "yyyy-MM-dd";
	$scope.minDate = {
		start_date: new Date(),
		end_date: new Date()
	};
	$scope.maxDate = {
		start_date: null,
		end_date: null
	};
	$scope.changeMinDate = function (field) {
		$scope.minDate[field] = $scope.project.start_date;
		$scope.project.start_date = $scope.project.start_date.toISOString();
		$scope.project.start_date = $scope.project.start_date.split("T");
		$scope.project.start_date = $scope.project.start_date[0];
	};
	$scope.changeMaxDate = function (field) {
		$scope.maxDate[field] = $scope.project.end_date;
		$scope.project.end_date = $scope.project.end_date.toISOString();
		$scope.project.end_date = $scope.project.end_date.split("T");
		$scope.project.end_date = $scope.project.end_date[0];
	};

	$scope.datepickers = {
		start_date: false,
		end_date: false
	};
	$scope.open = function ($event, clicked) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.datepickers[clicked] = true;
	};
});

angular.module('userApp.controllers', []).controller('UserListController', function ($scope, User) {
	$scope.users = User.query();
}).controller('UserDetailController', function ($scope, $stateParams, User) {
	$scope.user = User.get({id: $stateParams.id});
}).controller('UserCreateController', function ($scope, $state, $stateParams, User) {
	$scope.user = new User();

	$scope.createUser = function () {
		$scope.user.$save(function () {
			state.go('projects');
		});
	};
}).controller('UserEditController', function ($scope, $state, $stateParams, User) {
	$scope.updateUser = function () {
		$scope.user.$update(function () {
			state.go('projects');
		});
	};

	$scope.loadUser = function () {
		$scope.user = User.get({id: $stateParams.id});		
	};
	$scope.loadUser();
});
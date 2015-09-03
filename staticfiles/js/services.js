angular.module('projectApp.services', []).factory('Project', function ($resource) {
	return $resource('/api/projects/:id', {id: '@_id'},{
		update: {
			method: 'PUT'
		}
	});
}).service('popupService', function($window) {
	this.showPopup=function(message){
		return $window.confirm(message);
	}
});

angular.module('userApp.services', []).factory('User', function ($resource) {
	return {
		users: $resource('/api/users/:id', {id: '@_id'},{
			update: {method: 'PUT'}
		})
	}
});
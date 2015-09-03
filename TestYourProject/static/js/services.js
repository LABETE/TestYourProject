angular.module('projectApp.services', []).factory('Project', function ($resource) {
	// Allow to consult the rest api with get and query methods
	return $resource('/api/projects/:id', {id: ''},{
		// Update an entry in the rest api based on the id send in the url
		update: {
			method: 'PATCH', url: '/api/projects/:id', params: {id: '@id'}
		},
		// Delete an entry in the rest api based on the id send in the url
		delete: {
			method: 'DELETE', url: '/api/projects/:id', params: {id: '@id'}
		}
	})
}).factory('Case', function ($resource) {
	// Allow to consult the rest api with get and query methods
	return $resource('/api/cases/:caseid', {caseid: ''},{
		// Update an entry in the rest api based on the id send in the url
		update: {
			method: 'PATCH', url: '/api/cases/:caseid', params: {caseid: '@id'}
		},
		// Delete an entry in the rest api based on the id send in the url
		delete: {
			method: 'DELETE', url: '/api/cases/:caseid', params: {caseid: '@id'}
		}
	})
}).factory('CaseDetail', function ($resource) {
	// Allow to consult the rest api with get and query methods
	return $resource('/api/casedetails/:casedetailid', {casedetailid: ''},{
		// Update an entry in the rest api based on the id send in the url
		update: {
			method: 'PATCH', url: '/api/casedetails/:casedetailid', params: {casedetailid: '@id'} 
		},
		// Delete an entry in the rest api based on the id send in the url
		delete: {
			method: 'DELETE', url: '/api/casedetails/:casedetailid', params: {casedetailid: '@id'}
		}
	});
}).factory('Defect', function ($resource) {
	// Allow to consult the rest api with get and query methods
	return $resource('/api/defects/:defectid', {defectid: ''}, {
		// Update an entry in the rest api based on the id send in the url
		update: {
			method: 'PATCH', url: '/api/defects/:defectid', params: {defectid: '@id'}
		},
		// Delete an entry in the rest api based on the id send in the url
		delete: {
			method: 'DELETE', url: '/api/defects/:defectid', params: {defectid: '@id'}
		}
	});
}).factory('User', function ($resource) {
	// Allow to consult the rest api with get and query methods
	return $resource('/api/users/:id', {id: ''});
});

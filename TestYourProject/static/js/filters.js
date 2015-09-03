/*angular.module('projectApp.filters', []).filter('projectusernamefilter', function () {
	return function(input, projectuser) {
		var users_list= []
		var user = ""
		if(isNaN(input)) {
			return input;
		} else {
			if(Array.angular.isArray(projectuser)) {
				for(user=0;user<=input;user++) {
					for(projectusr=0;projectusr<=projectuser;user++) {
						if(input[user].id==projectuser[projectusr]) {
							users_list.push(input[user].username)
						}
					}
				}
				return users_list;
			} else {
				for(user=0;user<=input;user++) {
					if (input[user].id==projectuser) {
						user = input[user].username
					}
				}
				return user;
			}
		}
	}
});*/
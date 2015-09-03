angular.module('projectApp.controllers', []).controller('ProjectListController', function ($scope, $state, Project, Case, CaseDetail, Defect) {
	$scope.projects = [];
	$scope.cases = [];
	$scope.dctprojects = [];
	var total = 0;
	/* set up drag-and-drop event */

	
	Project.query(function (projects) {
		$scope.projects = projects;
		for(pos=0; pos < projects.length; pos++) {
			$scope.dctprojects[projects[pos].id] = [{
				"sum": 0,
				"percent": 0,
				"status_graph": ""
			},
			{
				"sum": 0,
				"percent": 0,
				"status_graph": "info"
			},
			{
				"sum": 0,
				"percent": 0,
				"status_graph": "success"
			},
			{
				"sum": 0,
				"percent": 0,
				"status_graph": "danger"
			},
			{
				"sum": 0,
				"percent": 0,
				"status_graph": "warning"
			}];
		}
		
		Case.query(function (cases) {
			$scope.cases = cases;
			for(pos=0; pos < cases.length; pos++) {
				if(cases[pos].status == 1) {
					// not started status
					$scope.dctprojects[cases[pos].project_id][0].sum = 
					$scope.dctprojects[cases[pos].project_id][0].sum + 1;
				} else if(cases[pos].status == 2) {
					// in progress status
					$scope.dctprojects[cases[pos].project_id][1].sum = 
					$scope.dctprojects[cases[pos].project_id][1].sum + 1;
				} else if(cases[pos].status == 3) {
					// passed status
					$scope.dctprojects[cases[pos].project_id][2].sum = 
					$scope.dctprojects[cases[pos].project_id][2].sum + 1;
				} else if(cases[pos].status == 4) {
					// failed status
					$scope.dctprojects[cases[pos].project_id][3].sum = 
					$scope.dctprojects[cases[pos].project_id][3].sum + 1;
				} else if(cases[pos].status == 5) {
					// not applicable status
					$scope.dctprojects[cases[pos].project_id][4].sum = 
					$scope.dctprojects[cases[pos].project_id][4].sum + 1;
				}
				total = $scope.dctprojects[cases[pos].project_id][0].sum + 
				$scope.dctprojects[cases[pos].project_id][1].sum + 
				$scope.dctprojects[cases[pos].project_id][2].sum + 
				$scope.dctprojects[cases[pos].project_id][3].sum + 
				$scope.dctprojects[cases[pos].project_id][4].sum;
				$scope.dctprojects[cases[pos].project_id][0].percent = 
				$scope.dctprojects[cases[pos].project_id][0].sum * 100 / total;
				$scope.dctprojects[cases[pos].project_id][1].percent = 
				$scope.dctprojects[cases[pos].project_id][1].sum * 100 / total;
				$scope.dctprojects[cases[pos].project_id][2].percent = 
				$scope.dctprojects[cases[pos].project_id][2].sum * 100 / total;
				$scope.dctprojects[cases[pos].project_id][3].percent = 
				$scope.dctprojects[cases[pos].project_id][3].sum * 100 / total;
				$scope.dctprojects[cases[pos].project_id][4].percent = 
				$scope.dctprojects[cases[pos].project_id][4].sum * 100 / total;
			}
		});
	});
	$scope.statuschoices = 
	[{
		"id": 1,
		"name": "Not Started",
		"color": "#31b0d5"
	},
	{
		"id": 2,
		"name": "In Progress",
		"color": "#337ab7"
	},
	{
		"id": 3,
		"name": "Passed",
		"color": "#449d44"
	},
	{
		"id": 4,
		"name": "Failed",
		"color": "#c9302c"
	}];
	$scope.casedetails = CaseDetail.query();
	$scope.defects = Defect.query();
	var caseid = "";
	$scope.deleteProject = function(project) {
		
		project.$delete(function () {
			for(casenum=0;casenum<$scope.cases.length;casenum++) {
				if($scope.cases[casenum].project_id==project.id) {
					caseid = $scope.cases[casenum];
					$scope.cases[casenum].$delete();
				}
			}
			for(casedetailnum=0;casedetailnum<$scope.casedetails.length;casedetailnum++) {
				if($scope.casedetails[casedetailnum].case_id==caseid) {
					$scope.casedetails[casedetailnum].$delete();
				}
			}
			for(defectnum=0;defectnum<$scope.defects.length;defectnum++) {
				if($scope.defects[defectnum].project_id==project.id) {
					$scope.defects[defectnum].$delete();
				}
			}
			$state.reload();
		});
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
}).controller('Datepicker', function ($scope, $stateParams, Project) {
	$scope.projectid = $stateParams.id;
	if($scope.projectid) {
		Project.get({id:$scope.projectid}, function (project) {
			if(project.start_date && project.end_date) {
				$scope.minDate = {
					start_date: new Date(project.start_date),
					end_date: new Date(project.start_date)
				};
				$scope.maxDate = {
					start_date: new Date(project.end_date),
					end_date: new Date(project.end_date)
				}
			} else if(project.start_date) {
				$scope.minDate = {
					start_date: new Date(project.start_date),
					end_date: new Date(project.start_date)
				};
				$scope.maxDate = {
					start_date: null,
					end_date: null
				}
			} else if(project.end_date) {
				$scope.minDate = {
					start_date: new Date(),
					end_date: new Date()
				};
				$scope.maxDate = {
					start_date: new Date(project.end_date),
					end_date: new Date(project.end_date)
				}
			}
		});
	} else {
		$scope.minDate = {
			start_date: new Date(),
			end_date: new Date()
		};
		$scope.maxDate = {
			start_date: null,
			end_date: null
		};
	}
	$scope.format = "yyyy-MM-dd";
	
	$scope.changeMinDate = function (field) {
		if($scope.project) {
			$scope.minDate[field] = $scope.project.start_date;
			$scope.project.start_date = $scope.project.start_date.toISOString();
			$scope.project.start_date = $scope.project.start_date.split("T");
			$scope.project.start_date = $scope.project.start_date[0];
		} else if($scope.testcase) {
			$scope.minDate[field] = $scope.testcase.start_date;
			$scope.testcase.start_date = $scope.testcase.start_date.toISOString();
			$scope.testcase.start_date = $scope.testcase.start_date.split("T");
			$scope.testcase.start_date = $scope.testcase.start_date[0];
		}
		
	};
	$scope.changeMaxDate = function (field) {
		if($scope.project) {
			$scope.maxDate[field] = $scope.project.end_date;
			$scope.project.end_date = $scope.project.end_date.toISOString();
			$scope.project.end_date = $scope.project.end_date.split("T");
			$scope.project.end_date = $scope.project.end_date[0];
		} else if($scope.testcase) {
			$scope.maxDate[field] = $scope.testcase.end_date;
			$scope.testcase.end_date = $scope.testcase.end_date.toISOString();
			$scope.testcase.end_date = $scope.testcase.end_date.split("T");
			$scope.testcase.end_date = $scope.testcase.end_date[0];
		}
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
}).controller('displayController', function ($scope) {
	$scope.showDelete = false;
	$scope.displayDragDropFile = false;
	$scope.displayDelete = function () {
		$scope.showDelete = true;
	};
	$scope.cancelDelete = function () {
		$scope.showDelete = false;
	};
	$scope.displayDropFile = function () {
		$scope.displayDragDropFile = !$scope.displayDragDropFile;
	};
}).controller('CaseListController', function ($scope, $state, $stateParams, Case, CaseDetail) {
	$scope.projectid = $stateParams.id; 
	$scope.dctcases = [];
	Case.query(function (cases) {
		$scope.cases = cases;
		for(pos=0; pos < cases.length; pos++) {
			$scope.dctcases[cases[pos].id] = [{
				"sum": 0,
				"percent": 0,
				"status_graph": ""
			},
			{
				"sum": 0,
				"percent": 0,
				"status_graph": "info"
			},
			{
				"sum": 0,
				"percent": 0,
				"status_graph": "success"
			},
			{
				"sum": 0,
				"percent": 0,
				"status_graph": "danger"
			},
			{
				"sum": 0,
				"percent": 0,
				"status_graph": "warning"
			}];
		}
		CaseDetail.query(function (casedetails) {
			$scope.casedetails = casedetails;
			for(pos=0; pos < casedetails.length; pos++) {
				if(casedetails[pos].status == 1) {
					// not started status
					$scope.dctcases[casedetails[pos].case_id][0].sum = 
					$scope.dctcases[casedetails[pos].case_id][0].sum + 1;
				} else if(casedetails[pos].status == 2) {
					// in progress status
					$scope.dctcases[casedetails[pos].case_id][1].sum = 
					$scope.dctcases[casedetails[pos].case_id][1].sum + 1;
				} else if(casedetails[pos].status == 3) {
					// passed status
					$scope.dctcases[casedetails[pos].case_id][2].sum = 
					$scope.dctcases[casedetails[pos].case_id][2].sum + 1;
				} else if(casedetails[pos].status == 4) {
					// failed status
					$scope.dctcases[casedetails[pos].case_id][3].sum = 
					$scope.dctcases[casedetails[pos].case_id][3].sum + 1;
				} else if(casedetails[pos].status == 5) {
					// not applicable status
					$scope.dctcases[casedetails[pos].case_id][4].sum = 
					$scope.dctcases[casedetails[pos].case_id][4].sum + 1;
				}
				total = $scope.dctcases[casedetails[pos].case_id][0].sum + 
				$scope.dctcases[casedetails[pos].case_id][1].sum + 
				$scope.dctcases[casedetails[pos].case_id][2].sum + 
				$scope.dctcases[casedetails[pos].case_id][3].sum + 
				$scope.dctcases[casedetails[pos].case_id][4].sum;
				$scope.dctcases[casedetails[pos].case_id][0].percent = 
				$scope.dctcases[casedetails[pos].case_id][0].sum * 100 / total;
				$scope.dctcases[casedetails[pos].case_id][1].percent = 
				$scope.dctcases[casedetails[pos].case_id][1].sum * 100 / total;
				$scope.dctcases[casedetails[pos].case_id][2].percent = 
				$scope.dctcases[casedetails[pos].case_id][2].sum * 100 / total;
				$scope.dctcases[casedetails[pos].case_id][3].percent = 
				$scope.dctcases[casedetails[pos].case_id][3].sum * 100 / total;
				$scope.dctcases[casedetails[pos].case_id][4].percent = 
				$scope.dctcases[casedetails[pos].case_id][4].sum * 100 / total;
			}
		});
	});

	$scope.deleteCase = function (testcase) {
		testcase.$delete(function () {
			for(casedetailnum=0; casedetailnum<$scope.casedetails.length; casedetailnum++) {
				if($scope.casedetails[casedetailnum].case_id==testcase.id) {
					$scope.casedetails[casedetailnum].$delete();
				}
			}
			$state.reload();
		});
	};
	$scope.statuschoices = 
	[{
		"id": 1,
		"name": "Not Started",
		"color": "#31b0d5"
	},
	{
		"id": 2,
		"name": "In Progress",
		"color": "#337ab7"
	},
	{
		"id": 3,
		"name": "Passed",
		"color": "#449d44"
	},
	{
		"id": 4,
		"name": "Failed",
		"color": "#c9302c"
	},
	{
		"id": 5,
		"name": "Not Applicable",
		"color": "#ec971f"
	}];
}).controller('CaseDetailController', function ($scope, $stateParams, Case) {
	$scope.testcase = Case.get({caseid: $stateParams.caseid});
	$scope.projectid = $stateParams.id; 
}).controller('CaseCreateController', function ($scope, $state, $stateParams, Case) {
	$scope.projectid = $stateParams.id;
	$scope.testcase = new Case();

	$scope.createCase = function () {
		$scope.testcase.project_id = $scope.projectid;
		$scope.testcase.$save(function () {
			$state.go('cases', {id: $scope.projectid});
		});
	};
}).controller('CaseEditController', function ($scope, $state, $stateParams, Case) {
	$scope.projectid = $stateParams.id;
	$scope.updateCase = function () {
		$scope.testcase.$update(function () {
			$state.go('cases', {id: $scope.projectid});
		});
	};

	$scope.loadCase = function () {
		$scope.testcase = Case.get({caseid: $stateParams.caseid});
	};

	$scope.loadCase();
}).controller('DefectListController', function ($scope, $state, Defect) {
	$scope.defects = Defect.query();
}).controller('DefectDetailController', function ($scope, $state, $stateParams, Defect) {
	$scope.defect = Defect.get({defectid: $stateParams.defectid});
}).controller('DefectCreateController', function ($scope, $state, $stateParams, Defect, User, Project) {
	$scope.defects = Defect.query();
	$scope.users = User.query();
	$scope.projects = Project.query();
	$scope.defect = new Defect();
	var project_users = [];
	$scope.users_to_display = [];
	

	$scope.changeProject = function () {
		$scope.users_to_display = [];
		for(pos=0; pos < $scope.projects.length; pos++) {
			if($scope.projects[pos].id == $scope.defect.project_id) {
				$scope.defect.project_name = $scope.projects[pos].name;
				project_users.push($scope.projects[pos].owner);
				for(co_owner=0; co_owner < $scope.projects[pos].co_owners.length; co_owner++) {
					project_users.push($scope.projects[pos].co_owners[co_owner]);
				}
			}
		}
		for(pos=0;pos<$scope.users.length;pos++) {
			if(project_users.indexOf($scope.users[pos].id) > -1) {
				$scope.users_to_display.push($scope.users[pos]);
			}
		}
		$scope.defect.owner = "";
		$scope.defect.assigned = "";
		project_users = [];
	}
	
	$scope.createDefect = function () {
		$scope.defect.id_displayed = 0;
		for(pos=0;pos < $scope.defects.length; pos++) {
			if($scope.defect.project_id == $scope.defects[pos].project_id & 
				$scope.defect.id_displayed < $scope.defects[pos].id_displayed){
					$scope.defect.id_displayed = $scope.defects[pos].id_displayed + 1;
			}
		}
		if($scope.defect.id_displayed == 0) {
			$scope.defect.id_displayed = 1;
		}
		$scope.defect.$save(function () {
			$state.go('defects');
		});
	};
	$scope.statusdefectchoices = 
		[{
			"id": 1,
			"name": "New"
		},
		{
			"id": 2,
			"name": "In Progress"
		},
		{
			"id": 3,
			"name": "Open"
		},
		{
			"id": 4,
			"name": "Closed"
		},
		{
			"id": 5,
			"name": "Deferred"
		},
		{
			"id": 6,
			"name": "Ready"
		}]
}).controller('DefectEditController', function ($scope, $state, $stateParams, Defect, Project, User) {
	$scope.projects = Project.query();
	$scope.users_to_display = User.query();
	var project_users = [];
	$scope.users = $scope.users_to_display;
	

	$scope.changeProject = function () {
		$scope.users_to_display = [];
		for(pos=0; pos < $scope.projects.length; pos++) {
			if($scope.projects[pos].id == $scope.defect.project_id) {
				project_users.push($scope.projects[pos].owner);
				for(co_owner=0; co_owner < $scope.projects[pos].co_owners.length; co_owner++) {
					project_users.push($scope.projects[pos].co_owners[co_owner]);
				}
			}
		}
		for(pos=0;pos<$scope.users.length;pos++) {
			if(project_users.indexOf($scope.users[pos].id) > -1) {
				$scope.users_to_display.push($scope.users[pos]);
			}
		}
		$scope.defect.owner = "";
		$scope.defect.assigned = "";
		project_users = [];
	};

	$scope.updateDefect = function () {
		$scope.defect.$update(function () {
			$state.go('defects');
		});
	};

	$scope.loadDefect = function () {
		$scope.defect = Defect.get({defectid: $stateParams.defectid});	
	};

	$scope.loadDefect();
	$scope.allowedUsers = function () {
		$scope.users_to_display = [];
		for(pos=0; pos < $scope.projects.length; pos++) {
			if($scope.projects[pos].id == $scope.defect.project_id) {
				project_users.push($scope.projects[pos].owner);
				for(co_owner=0; co_owner < $scope.projects[pos].co_owners.length; co_owner++) {
					project_users.push($scope.projects[pos].co_owners[co_owner]);
				}
			}
		}
		for(pos=0;pos<$scope.users.length;pos++) {
			if(project_users.indexOf($scope.users[pos].id) > -1) {
				$scope.users_to_display.push($scope.users[pos]);
			}
		}
	};
		

	$scope.statusdefectchoices = 
		[{
			"id": 1,
			"name": "New"
		},
		{
			"id": 2,
			"name": "In Progress"
		},
		{
			"id": 3,
			"name": "Open"
		},
		{
			"id": 4,
			"name": "Closed"
		},
		{
			"id": 5,
			"name": "Deferred"
		},
		{
			"id": 6,
			"name": "Ready"
		}]
}).controller('CaseDetailListController', function ($scope, $interval, $state, $stateParams, CaseDetail, Defect, Case, Project) {
	// get the project id from the url
	$scope.projectid = $stateParams.id;
	// get the case id from the url
	$scope.caseid = $stateParams.caseid;
	$scope.casedetails = [];
	var casedetaildisplayed = [];
	$scope.casedetail = [];
	$scope.defects = [];
	// return the testcase equals to the caseid 
	$scope.testcase = Case.get({caseid: $scope.caseid});
	// return the project equals to the projectid
	$scope.project = Project.get({id: $scope.projectid});
	$scope.cases = [];
	// query all the testcases that are displayed for this user in the api
	Case.query(function (cases) {
		// select each testcase from the Case.query()
		cases.filter(function (testcase) {
			// save in $scope.cases the testcase returned if the testcase.project_id
			// is equals to the $scope.projectid saved from the url
			if($scope.projectid.indexOf(testcase.project_id) > -1) {
				$scope.cases.push(testcase);
			}
		});
	});
	// query all the defects that are displayed for this user in the api
	Defect.query(function (defects) {
		// select each defect from the Defect.query()
		defects.filter(function (defect) {
			// save in $scope.defects the defect returned if the defect.project_id
			// is equals to the $scope.projectid saved from the url
			if($scope.projectid.indexOf(defect.project_id) > -1) {
				$scope.defects.push(defect);
			}
		});
	});
	// query all the casedetails that are displayed for this user in the api
	CaseDetail.query(function (data) {
		// select each defect from the CaseDetail.query()
		data.filter(function (casedetail) {
			// save in $scope.casedetails the casedetail returned if the casedetail.case_id
			// is equals to the $scope.caseid saved from the url and save each id
			// in casedetaildisplayed
			if($scope.caseid.indexOf(casedetail.case_id) > -1) {
				$scope.casedetails.push(casedetail);
				casedetaildisplayed.push(casedetail.id);
			}
		});
	});
	// for create a casedetail
	$scope.casedetailadd = new CaseDetail();
	// function for create a casedetail entry
	$scope.createCaseDetail = function () {
		// get the step from the user input
		var step = $scope.casedetailadd.step;
		// function for save the casedetail
		$scope.saveCaseDetail = function () {
			// get the $scope.caseid saved from the url
			$scope.casedetailadd.case_id = $scope.caseid;
			// executes the save method for create the casedetail entry
			$scope.casedetailadd.$save(function () {
				// query all the casedetails that are displayed for this user in the api
				CaseDetail.query(function (data) {
					// select each defect from the CaseDetail.query()
					data.filter(function (casedetail) {
						// save in $scope.casedetails the casedetail returned if the casedetail.case_id
						// is equals to the $scope.caseid saved from the url and if is not in
						// casedetaildisplayed list and the casedetail.id is added to the
						// casedetaildisplayed list
						if($scope.caseid.indexOf(casedetail.case_id) > -1) {
							if(casedetaildisplayed.indexOf(casedetail.id) == -1)
							$scope.casedetails.push(casedetail);
							casedetaildisplayed.push(casedetail.id);
						}
					});
				});
				// clear all the input casedetail fields after saving the entry
				$scope.casedetailadd.expected = "";
				$scope.casedetailadd.actual = "";
				$scope.casedetailadd.input_data = "";
				$scope.casedetailadd.output_data = "";
				$scope.casedetailadd.step = "";
			});
		};
		// verify if casedetails contain something
		// this is for save an step in an existent step
		// and displace the other steps one step ahead
		if ($scope.casedetails.length) {
			// verify if step contain a value between 0 and the length of casedetails
			if(step > 0 & step <= $scope.casedetails.length) {
				// position = pos, initial pos = to the step inserted by the user
				// and where should be saved the information from the step to be inserted
				for(pos=step - 1; pos < $scope.casedetails.length; pos++) {
					// save in variables the data from the casedetails in the current position
					var status = $scope.casedetails[pos].status;
				 	var defect_id = $scope.casedetails[pos].defect_id;
				 	var defect_id_displayed = $scope.casedetails[pos].defect_id_displayed;
				 	var expected = $scope.casedetails[pos].expected;
				 	var actual = $scope.casedetails[pos].actual;
				 	var input_data = $scope.casedetails[pos].input_data;
				 	var output_data = $scope.casedetails[pos].output_data;
				 	// save the data from the input fields inserted by the user
				 	// in the current position
				 	$scope.casedetails[pos].status = $scope.casedetailadd.status;
				 	$scope.casedetails[pos].defect_id = $scope.casedetailadd.defect_id;
				 	$scope.casedetails[pos].defect_id_displayed = $scope.casedetailadd.defect_id_displayed
				 	;
				 	$scope.casedetails[pos].expected = $scope.casedetailadd.expected;
				 	$scope.casedetails[pos].actual = $scope.casedetailadd.actual;
				 	$scope.casedetails[pos].input_data = $scope.casedetailadd.input_data;
				 	$scope.casedetails[pos].output_data = $scope.casedetailadd.output_data;
				 	// Save the current step with the new information
				 	$scope.casedetails[pos].$update();
				 	// the information from the variables is passed to the casedetailadd list
				 	$scope.casedetailadd.status = status;
				 	$scope.casedetailadd.defect_id = defect_id;
				 	$scope.casedetailadd.defect_id_displayed = defect_id_displayed;
				 	$scope.casedetailadd.expected = expected;
				 	$scope.casedetailadd.actual = actual;
				 	$scope.casedetailadd.input_data = input_data;
				 	$scope.casedetailadd.output_data = output_data;
				}
			}
			// save the last step number + 1
			$scope.casedetailadd.step = $scope.casedetails[$scope.casedetails.length - 1].step + 1;
			// at this point the information that was in the last step is not more in the displayed steps
			// for the user but is saved in the casedetailadd list and here is called the 
			// $scope.saveCaseDetail() function for create a new step with this information
			$scope.saveCaseDetail();
		} else {
			// if there is nothing in $scope.casedetails the first step is created
			$scope.casedetailadd.step = 1;
			$scope.saveCaseDetail();
		}
	};
	// for update the defect in each casedetail
	$scope.changeCaseDetailDefect = function (casedetail) {
		if(casedetail.defect_id) {
			for(pos=0; pos < $scope.defects.length; pos++) {
				if(casedetail.defect_id == $scope.defects[pos].id) {
					casedetail.defect_id_displayed = $scope.defects[pos].id_displayed;
				}
			}
			casedetail.$update();
		}
	}
	// update de state in the current project, current case and current casedetail depending
	// on what is selected in casedetail
	$scope.changeCaseDetailStatus = function (casedetail) {
		var passedstepcounter = 0;
		var passedcasecounter = 0;
		var failedflag = false;
		casedetail.$update();
		if(casedetail.status != 1) {
			if(casedetail.status == 5 & casedetail.step == 1 & $scope.testcase.status != 5) {
				// not applicable status
				$scope.testcase.status = 5;
				$scope.testcase.$update();
				$scope.project.status = 2;
				$scope.project.$update();
			} else if(casedetail.status == 4 & $scope.testcase.status != 4) {
				// failed status
				$scope.testcase.status = 4;
				$scope.testcase.$update();
				$scope.project.status = 4;
				$scope.project.$update();
			} else if(casedetail.status == 3 || casedetail.status == 5) {
				for(pos=0; pos < $scope.casedetails.length; pos++) {
					// count passed steps or if there is one step failed
					if($scope.casedetails[pos].status == 4) {
						failedflag = true;
						break;
					} else if($scope.casedetails[pos].status == 3 || $scope.casedetails[pos].status == 5) {
						passedstepcounter = passedstepcounter + 1;
					}
				}
				if(passedstepcounter == $scope.casedetails.length) {
					// if all steps are passed update case
					$scope.testcase.status = 3;
					$scope.testcase.$update();
					for(pos=0; pos < $scope.cases.length; pos++) {
						// count if all test cases are passed
						if($scope.cases[pos].caseid == $scope.testcase.caseid) {
							$scope.cases[pos] = $scope.testcase;
						}
						if($scope.cases[pos].status == 3) {
							passedcasecounter = passedcasecounter + 1;
						}
					}
					if(passedcasecounter == $scope.cases.length) {
						// if all test cases are passed update project to passed
						$scope.project.status = 3; 
						$scope.project.$update();
					}
				} else if(!failedflag){
					// if not all the steps are passed and is not failed test case is set to in progress
					$scope.testcase.status = 2;
					$scope.testcase.$update();
					if ($scope.project.status == 1 || $scope.project.status == 4) {
						// if the project is as not started status is changed to in progress
						$scope.project.status = 2;
						$scope.project.$update();
					}
				}
			} else if(casedetail.status == 2 & $scope.testcase.status != 4 & $scope.testcase.status != 2) {
				$scope.testcase.status = 2;
				$scope.testcase.$update();
			} 
		} else if (casedetail.status == 1 & casedetail.step == 1) {
			// not started status
			for(pos=0; pos < $scope.casedetails.length; pos++) {
				// change all the steps to not started when first step status is 1
				if($scope.casedetails[pos].status != 1) {
					$scope.casedetails[pos].status = 1;
					$scope.casedetails[pos].$update();
				}
			}
			// update testcase status to not started
			$scope.testcase.status = 1;
			$scope.testcase.$update();
			var casecounter = 0
			for (pos=0; pos < $scope.cases.length; pos++) {
				if($scope.cases[pos].id == $scope.testcase.caseid) {
					$scope.cases[pos] = $scope.testcase;
				}
				if($scope.cases[pos].status == 1){
					casecounter = casecounter + 1;
				}
			}
			// if all test cases are as not started project is set to not started
			if(casecounter == $scope.cases.length) {
				$scope.project.status = 1;
				$scope.project.$update();
			}
		}
	}
	// update casedetail text
	$scope.changeCaseDetail = function (casedetail) {
		casedetail.$update();
	};

	$scope.updownstepCaseDetail = function (casedetail) {
		var step = casedetail.step;
		if(step < casedetail.stepmod & casedetail.stepmod <= $scope.casedetails.length) {
			for(pos=casedetail.stepmod - 1; pos > step - 1; pos--) {
				var status = $scope.casedetails[pos].status;
				var defect_id = $scope.casedetails[pos].defect_id;
				var defect_id_displayed = $scope.casedetails[pos].defect_id_displayed;
				var expected = $scope.casedetails[pos].expected;
				var actual = $scope.casedetails[pos].actual;
				var input_data = $scope.casedetails[pos].input_data;
				var output_data = $scope.casedetails[pos].output_data;
				$scope.casedetails[pos].status = casedetail.status;
				$scope.casedetails[pos].defect_id = casedetail.defect_id;
				$scope.casedetails[pos].defect_id_displayed = casedetail.defect_id_displayed;
				$scope.casedetails[pos].expected = casedetail.expected;
				$scope.casedetails[pos].actual = casedetail.actual;
				$scope.casedetails[pos].input_data = casedetail.input_data;
				$scope.casedetails[pos].output_data = casedetail.output_data;
				$scope.casedetails[pos].$update();
				casedetail.status = status;
				casedetail.defect_id = defect_id;
				casedetail.defect_id_displayed = defect_id_displayed;
				casedetail.expected = expected;
				casedetail.actual = actual;
				casedetail.input_data = input_data;
				casedetail.output_data = output_data;
			}
		} else if(step > casedetail.stepmod & casedetail.stepmod > 0) {
			for(pos=casedetail.stepmod - 1; pos < step; pos++) {
				status = $scope.casedetails[pos].status;
				defect_id = $scope.casedetails[pos].defect_id;
				defect_id_displayed = $scope.casedetails[pos].defect_id_displayed;
				expected = $scope.casedetails[pos].expected;
				actual = $scope.casedetails[pos].actual;
				input_data = $scope.casedetails[pos].input_data;
				output_data = $scope.casedetails[pos].output_data;
				$scope.casedetails[pos].status = casedetail.status;
				$scope.casedetails[pos].defect_id = casedetail.defect_id;
				$scope.casedetails[pos].defect_id_displayed = casedetail.defect_id_displayed;
				$scope.casedetails[pos].expected = casedetail.expected;
				$scope.casedetails[pos].actual = casedetail.actual;
				$scope.casedetails[pos].input_data = casedetail.input_data;
				$scope.casedetails[pos].output_data = casedetail.output_data;
				$scope.casedetails[pos].$update();
				casedetail.status = status;
				casedetail.defect_id = defect_id;
				casedetail.defect_id_displayed = defect_id_displayed;
				casedetail.expected = expected;
				casedetail.actual = actual;
				casedetail.input_data = input_data;
				casedetail.output_data = output_data;
			}
		}
	};
	//
	$scope.deleteCaseDetail = function (casedetail) {
		var step = casedetail.step
		for(pos=step - 1; pos < $scope.casedetails.length; pos++) {
			if($scope.casedetails[pos + 1]) {
				$scope.casedetails[pos].status = $scope.casedetails[pos + 1].status;
				$scope.casedetails[pos].defect_id = $scope.casedetails[pos + 1].defect_id;
				$scope.casedetails[pos].defect_id_displayed = $scope.casedetails[pos + 1].defect_id_displayed;
				$scope.casedetails[pos].expected = $scope.casedetails[pos + 1].expected;
				$scope.casedetails[pos].actual = $scope.casedetails[pos + 1].actual;
				$scope.casedetails[pos].input_data = $scope.casedetails[pos + 1].input_data;
				$scope.casedetails[pos].output_data = $scope.casedetails[pos + 1].output_data;
				$scope.casedetails[pos].$update();
			} else {
				$scope.casedetails[pos].$delete();
				$scope.casedetails.splice(-1, 1);
			}
		}
	};

	$scope.statuschoices = 
		[{
			"id": 1,
			"name": "Not Started"
		},
		{
			"id": 2,
			"name": "In Progress"
		},
		{
			"id": 3,
			"name": "Passed"
		},
		{
			"id": 4,
			"name": "Failed"
		},
		{
			"id": 5,
			"name": "Not Applicable"
		}];
}).controller('DisplayStepsController', function ($scope) {
	$scope.displaystep = false;
	$scope.displaychangestep = function () {
		$scope.displaystep = !$scope.displaystep;
	}
}).controller('UserListController', function ($scope, User) {
	//  Return all the users data
	$scope.users = User.query();
});

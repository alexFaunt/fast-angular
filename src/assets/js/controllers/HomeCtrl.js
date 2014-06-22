
/**
 * Home Controller
 */

;(function (window, angular) {
	'use strict';

	var app = angular.module(window.appName);

	angular.module(app.name + 'Controllers').controller('HomeCtrl',
		['$scope', '$translate', 'TeamService',
		function ($scope, $translate, TeamService) {
			$scope.teams = TeamService.query();
		}
	]);

})(window, angular);
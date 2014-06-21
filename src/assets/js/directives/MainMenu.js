
/**
 * Main menu directive
 */

;(function (window, angular) {
	'use strict';

	var app = angular.module(window.appName);

	app.directive('mainMenu',
		['MainMenuService',
		function(MainMenuService) {
	    return {
	      	templateUrl: app.STATIC.MODULES_PATH + 'main-menu.html',
	      	controller: function ($scope) {
	    		$scope.menuItems = MainMenuService.query();
	      	}
	    };
	}]);

})(window, angular);
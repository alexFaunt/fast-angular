
/**
 * Main menu directive
 */

;(function (window, angular) {
	'use strict';

	var app = angular.module(window.appName);

	app.directive('mainMenu', function() {
	    return {
	      	templateUrl: app.STATIC.VIEWS_PATH + 'main-menu.html',
	      	controller: function ($scope) {
	      		$scope.name = 'Menu stuff';
	      	}
	    };
	});

})(window, angular);
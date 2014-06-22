
/**
 * Page header directive
 */

;(function (window, angular) {
	'use strict';

	var app = angular.module(window.appName);

	app.directive('pageHeader', function() {

		var PageHeaderCtrl = function ($scope, MainMenuApi) {
        	this.scope = $scope;

	        this.scope.openMenu = function () {
	        	MainMenuApi.open();
	        };
	    };

	    return {
	      	templateUrl: app.STATIC.MODULES_PATH + 'page-header.html',
	      	controller: PageHeaderCtrl
	    };
	});

})(window, angular);
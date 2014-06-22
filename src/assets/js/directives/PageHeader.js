
/**
 * Page header directive
 */

;(function (window, angular) {
	'use strict';

	var app = angular.module(window.appName);

	app.directive('pageHeader', function() {

		var PageHeaderCtrl = function ($scope, MainMenuApi, FilterMenuApi) {
        	this.scope = $scope;

	        this.scope.openMainMenu = function () {
	        	MainMenuApi.open();
	        };

	        this.scope.openFilterMenu = function () {
	        	FilterMenuApi.open();
	        };
	    };

	    return {
	      	templateUrl: app.STATIC.MODULES_PATH + 'page-header.html',
	      	controller: PageHeaderCtrl
	    };
	});

})(window, angular);
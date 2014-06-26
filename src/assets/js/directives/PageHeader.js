
/**
 * Page header directive
 */

;(function (window, angular) {
	'use strict';

	var app = angular.module(window.appName);

	app.directive('pageHeader', function() {

		var PageHeaderCtrl = function ($scope, MainMenuApi, ContextMenuApi) {
        	this.scope = $scope;

	        this.scope.openMainMenu = function () {
	        	MainMenuApi.open();
	        };

	        this.scope.openContextMenu = function () {
	        	ContextMenuApi.open();
	        };
	    };

	    return {
	      	templateUrl: app.STATIC.MODULES_PATH + 'page-header.html',
	      	replace: true,
	      	controller: PageHeaderCtrl
	    };
	});

})(window, angular);
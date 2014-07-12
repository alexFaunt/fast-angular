
/**
 * Page header directive
 */

;(function (window, angular) {
	'use strict';

	var app = angular.module(window.appName);

	app.directive('pageHeader', [
		'MainMenuApi', 'ContextMenuApi',
		function(MainMenuApi, ContextMenuApi) {

			var PageHeaderCtrl = function ($scope) {
	        	this.scope = $scope;

		        this.scope.openMainMenu = function () {
		        	MainMenuApi.open();
		        };

		        this.scope.openContextMenu = function () {
		        	ContextMenuApi.open();
		        };
		    };

		    return {
		      	templateUrl: app.STATIC.DIRECTIVES_PATH + 'page-header.html',
		      	replace: true,
		      	controller: ['$scope', PageHeaderCtrl]
		    };
		}
	]);

})(window, angular);
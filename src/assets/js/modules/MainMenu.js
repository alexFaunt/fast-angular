
/**
 * Main menu module
 */

;(function (window, angular) {
	'use strict';

	var app = angular.module(window.appName);

	var MainMenuModule = angular.module('MainMenuModule', []);

	/* Api for interaction with other components of app */
	MainMenuModule.factory('MainMenuApi', function() {
	    return {
	        isOpen: false,
	        open: function() {
	        	this.isOpen = true;
	        },
	        close: function() {
	        	this.isOpen = false;
	        },
	        toggle: function() {
	        	this.isOpen = !this.isOpen;
	        }
	    };
	});

	/* private service for fetching menu items */
	MainMenuModule.factory('MainMenuService', [
		'$resource',
		function ($resource) {
			return $resource('data/mainMenu.json', {}, {
				query: {
					method: 'GET',
					isArray: true
				}
			});
		}
	]);

	/* definition and control */
	MainMenuModule.directive('mainMenu',
		function() {

			var MainMenuCtrl = function ($scope, MainMenuApi, MainMenuService, PageStateApi) {

	        	$scope.menuItems = MainMenuService.query();

	            $scope.mainMenuApi = MainMenuApi;

	           	PageStateApi.registerState({
	           		id: 'MENU_OPEN',
					klass: 'menu-open',
					reset: function () {
			        	MainMenuApi.close();
			        }
				});

	            $scope.$watch('mainMenuApi.isOpen', function (newValue, oldValue) {
		        	if (newValue === oldValue) {
		        		return;
		        	}
		        	if (newValue) {
		        		PageStateApi.addState(PageStateApi.STATES.MENU_OPEN);
		        	}
		        	else {
		        		PageStateApi.removeState(PageStateApi.STATES.MENU_OPEN);
		        	}
		        });

	            $scope.closeMenu = function () {
	            	MainMenuApi.close();
	            };
		    };


		    return {
		      	templateUrl: app.STATIC.MODULES_PATH + 'main-menu.html',
		      	replace: true,
		      	controller: MainMenuCtrl
		    };
		}
	);

})(window, angular);
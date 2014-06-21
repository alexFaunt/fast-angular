
/**
 * Team service providing teams
 */

;(function (window, angular) {
	'use strict';

	var services = angular.module(window.appName + 'Services');

	services.factory('MainMenuService', [
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

})(window, angular);
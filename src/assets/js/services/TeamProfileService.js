
/**
 * Team service providing teams
 */

;(function (window, angular) {
	'use strict';

	var services = angular.module(window.appName + 'Services');

	services.factory('TeamProfileService', [
		'$resource',
		function ($resource) {
			return $resource('data/teams/:teamId.json', {}, {
				query: {
					method: 'GET',
					params: {
						teamId: 'teams'
					},
					isArray: true

				}
			});
		}
	]);

})(window, angular);

/**
 * Home Controller
 */

;(function (window, angular) {
	'use strict';

	var app = angular.module(window.appName);

	angular.module(app.name + 'Controllers').controller('HomeCtrl',
		['$scope', '$http',
		function ($scope, $http) {
			$http.get('data/blog.json').success(function(data) {
                $scope.blog = data;
            });

            $http.get('data/twitter.json').success(function(data) {
                $scope.tweets = data;
            });
		}
	]);

})(window, angular);
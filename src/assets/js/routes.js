
;(function (window, angular) {
	'use strict';

    var app = angular.module(window.appName);

	app.config(['$routeProvider',
		function ($routeProvider) {
            // home route
			$routeProvider.when('/', {
                templateUrl: app.STATIC.VIEWS_PATH + 'home.html',
                controller: 'HomeCtrl'
            })

            // leagues
            .when('/leagues', {
                templateUrl: app.STATIC.VIEWS_PATH + 'leagues.html',
                controller: 'LeaguesCtrl'
            })

            // fixtures
            .when('/fixtures', {
                templateUrl: app.STATIC.VIEWS_PATH + 'fixtures.html',
                controller: 'FixturesCtrl'
            })

            // Teams
            .when('/teams', {
                templateUrl: app.STATIC.VIEWS_PATH + 'teams.html',
                controller: 'TeamsCtrl'
            })
            .when('/teams/:teamId', {
                templateUrl: app.STATIC.VIEWS_PATH + 'team-profile.html',
                controller: 'TeamProfileCtrl'
            })

            // 404 style page
            .when('/error', {
                templateUrl: app.STATIC.VIEWS_PATH + 'error.html'
            })
			.otherwise({
			     redirectTo: 'error'
			});
		}
	]);

})(window, angular);
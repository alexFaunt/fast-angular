
;(function (window, angular) {
	'use strict';

    var app = angular.module(window.appName);

    var standardRoute = function (name) {
    	return {
	        templateUrl: app.STATIC.VIEWS_PATH + name.toLowerCase() + '.html',
	        controller: name + 'Ctrl'
	    };
    };

	app.config(['$routeProvider',
		function ($routeProvider) {
			$routeProvider.when('/',
			    standardRoute('Home')
			)
            .when('/leagues',
                standardRoute('Leagues')
            )
			.otherwise({
			     redirectTo: app.STATIC.VIEWS_PATH + 'error.html'
			});
		}
	]);

})(window, angular);
/**
 * Main app file - declares all things global
 */

;(function (window, angular) {
	'use strict';

    // Application setup with required modules
	window.appName = 'sportstats';
    var app = angular.module(window.appName, [
    	'ngRoute',
        'ngCookies',
    	window.appName + 'Services',
    	window.appName + 'Controllers',
        'pascalprecht.translate',

        'PageStateModule',
        'MainMenuModule',
        'ContextMenuModule'
    ]);

    // TODO Could use 'app.value'
   	// app globals
    app.STATIC = {
        VIEWS_PATH: 'views/',
        MODULES_PATH: 'views/modules/',
        CONTROLLERS_PATH: 'controllers/'
    };

    // Declare contollers and services so they can be attached in other files
	angular.module(app.name + 'Services', ['ngResource']);
	angular.module(app.name + 'Controllers', []);


})(window, angular);






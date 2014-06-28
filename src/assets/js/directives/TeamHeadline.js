
/**
 * Team profile headline directive
 */

;(function (window, angular) {
    'use strict';

    var app = angular.module(window.appName);

    app.directive('teamHeadline', function() {

        var TeamHeadlineCtrl = function ($scope) {

        };

        return {
            templateUrl: app.STATIC.DIRECTIVES_PATH + 'team-headline.html',
            replace: true,
            controller: TeamHeadlineCtrl
        };
    });

})(window, angular);
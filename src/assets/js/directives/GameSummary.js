
/**
 * Games list directive
 */

;(function (window, angular) {
    'use strict';

    var app = angular.module(window.appName);

    app.directive('gameSummary', function() {

        var GameSummaryCtrl = function ($scope) {



        };

        return {
            templateUrl: app.STATIC.DIRECTIVES_PATH + 'game-summary.html',
            replace: true,
            controller: GameSummaryCtrl,
            scope: {
                game: '=game'
            }
        };
    });

})(window, angular);
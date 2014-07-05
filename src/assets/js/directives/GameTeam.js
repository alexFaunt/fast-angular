
/**
 * Game Team directive - makes all labels same width
 */

;(function (window, angular) {
    'use strict';

    var app = angular.module(window.appName);

    app.directive('gameTeam', function() {

        var gameTeamCtrl = function ($scope) {
            $scope.poo = 'poo';
        };

        return {
            templateUrl: app.STATIC.DIRECTIVES_PATH + 'game-team.html',
            controller: gameTeamCtrl,
            scope: {
                team: '=',
                game: '='
            },
            replace: true
        };
    });

})(window, angular);
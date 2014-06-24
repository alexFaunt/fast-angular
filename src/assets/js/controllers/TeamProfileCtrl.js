
/**
 * TeamProfile Controller
 */

;(function (window, angular) {
    'use strict';

    var app = angular.module(window.appName);

    angular.module(app.name + 'Controllers').controller('TeamProfileCtrl',
        ['$scope', '$routeParams', 'TeamProfileService',
        function ($scope, $routeParams, TeamProfileService) {

            $scope.team = TeamProfileService.get({
                teamId: $routeParams.teamId
            }, function(teamProfile) {
                // do stuff with teamProfile?
            });
        }
    ]);

})(window, angular);
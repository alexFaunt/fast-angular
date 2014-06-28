
/**
 * TeamProfile Controller
 */

;(function (window, angular) {
    'use strict';

    var app = angular.module(window.appName);

    var headlineListKeys = ['location', 'manager',  'coach', 'stadium'];

    angular.module(app.name + 'Controllers').controller('TeamProfileCtrl',
        ['$scope', '$routeParams', 'TeamProfileService',
        function ($scope, $routeParams, TeamProfileService) {


            $scope.headlineList = [];

            $scope.team = TeamProfileService.get({
                teamId: $routeParams.teamId
            },
            // callback - not sure why the scope doesnt just apply, or why i cant do this in directive
            function () {
                var i, len = headlineListKeys.length;
                $scope.headlineList = [];
                for (i=0; i < len; i+=1) {
                    $scope.headlineList.push({
                        term: 'LABEL_' + headlineListKeys[i].toUpperCase(),
                        value: $scope.team[headlineListKeys[i]]
                    });
                }
            });


        }
    ]);

})(window, angular);
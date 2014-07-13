
/**
 * App Controller
 */

;(function (window, angular) {
    'use strict';

    var app = angular.module(window.appName);

    angular.module(app.name + 'Controllers').controller('AppCtrl',
        ['$scope', '$timeout',
        function ($scope, $timeout) {

            if ($scope.$parent.myScroll !== undefined) {
                $scope.$parent.myScrollOptions = {
                    snap: false
                };

                $scope.refreshiScroll = function (toTop) {
                    $timeout(function () {
                        if (toTop) {
                            $scope.$parent.myScroll.wrapper.scrollTo(0, 0);
                        }
                        $scope.$parent.myScroll.wrapper.refresh();
                    }, app.STATIC.MENU_TRANSITION_TIME);
                };

                $scope.$on('$routeChangeSuccess', function () {
                    $scope.refreshiScroll(true);
                });
            }
            else {
                $scope.refreshiScroll = function () {};
            }
        }
    ]);

})(window, angular);

/**
 * Filter menu module
 */

;(function (window, angular) {
    'use strict';

    var app = angular.module(window.appName);

    var FilterMenuModule = angular.module('FilterMenuModule', []);

    /* Api for interaction with other components of app */
    FilterMenuModule.factory('FilterMenuApi', function() {
        return {
            isOpen: false,
            open: function() {
                this.isOpen = true;
            },
            close: function() {
                this.isOpen = false;
            },
            toggle: function() {
                this.isOpen = !this.isOpen;
            }
        };
    });

    /* definition and control */
    FilterMenuModule.directive('filterMenu',
        function() {

            var FilterMenuCtrl = function ($scope, FilterMenuApi, PageStateApi) {

                $scope.FilterMenuApi = FilterMenuApi;

                PageStateApi.registerState({
                    id: 'FILTERS_OPEN',
                    klass: 'filters-open',
                    reset: function () {
                        FilterMenuApi.close();
                    }
                });

                $scope.$watch('FilterMenuApi.isOpen', function (newValue, oldValue) {
                    if (newValue === oldValue) {
                        return;
                    }
                    if (newValue) {
                        PageStateApi.addState(PageStateApi.STATES.FILTERS_OPEN);
                    }
                    else {
                        PageStateApi.removeState(PageStateApi.STATES.FILTERS_OPEN);
                    }
                });
            };


            return {
                templateUrl: app.STATIC.MODULES_PATH + 'filter-menu.html',
                replace: true,
                controller: FilterMenuCtrl
            };
        }
    );

})(window, angular);
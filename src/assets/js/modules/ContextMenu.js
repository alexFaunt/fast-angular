
/**
 * Filter menu module
 */

;(function (window, angular) {
    'use strict';

    var app = angular.module(window.appName);

    var ContextMenuModule = angular.module('ContextMenuModule', []);

    /* Api for interaction with other components of app */
    ContextMenuModule.factory('ContextMenuApi', function() {
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
    ContextMenuModule.directive('contextMenu',
        function() {

            var ContextMenuCtrl = function ($scope, ContextMenuApi, PageStateApi) {

                $scope.ContextMenuApi = ContextMenuApi;

                PageStateApi.registerState({
                    id: 'CONTEXT_MENU_OPEN',
                    klass: 'context-menu-open',
                    reset: function () {
                        ContextMenuApi.close();
                    }
                });

                $scope.$watch('ContextMenuApi.isOpen', function (newValue, oldValue) {
                    if (newValue === oldValue) {
                        return;
                    }
                    if (newValue) {
                        PageStateApi.addState(PageStateApi.STATES.CONTEXT_MENU_OPEN);
                    }
                    else {
                        PageStateApi.removeState(PageStateApi.STATES.CONTEXT_MENU_OPEN);
                    }
                });
            };


            return {
                templateUrl: app.STATIC.MODULES_PATH + 'context-menu.html',
                replace: true,
                controller: ContextMenuCtrl
            };
        }
    );

})(window, angular);
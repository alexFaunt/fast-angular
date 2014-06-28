
/**
 * Definition list directive - makes all labels same width
 */

;(function (window, angular) {
    'use strict';

    var app = angular.module(window.appName);

    app.directive('definitionList', function() {

        // I HAVE NO IDEA HOW LIST GETS SET BUT IT WORKS... TODO ... WHAT THE FK.

        var DefinitionListCtrl = function ($scope, $element) {
            // // measure widths of labels + set width;

            // SRAPED THIS IDEA AND THAT OF THE ACTUAL DEFINTION LIST... ERRR LOL. MIGHT NEED TO REFACTOR TO BE DISPLAY TABLE
            // $scope.width = 0;

            // $scope.$watch(function () {
            //     var labels = $element.find('span');
            //     var maxWidth = 0;
            //     for (var i=0, len = labels.length; i < len; i+=1) {
            //         var currentWidth = labels[i].offsetWidth;
            //         maxWidth = (maxWidth > currentWidth) ? maxWidth : currentWidth;
            //     }
            // });


        };

        return {
            templateUrl: app.STATIC.DIRECTIVES_PATH + 'definition-list.html',
            controller: DefinitionListCtrl,
            scope: {
                list: '=ngModel'
            },
            require: 'ngModel',
            replace: true
        };
    });

})(window, angular);
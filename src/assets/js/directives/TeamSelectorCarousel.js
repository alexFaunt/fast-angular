
/**
 * Team selector carousel
 */

;(function (window, angular) {
    'use strict';

    var app = angular.module(window.appName);

    app.directive('teamSelectorCarousel', function() {

        var TeamSelectorCarousel = function ($scope, $element) {
            var maxIndex;
            // console.log($element);

            var touchStartPageX = null;
            var carouselWrapper = null;

            var touchStart = function (e) {
                touchStartPageX = e.touches[0].pageX;
                // carouselWrapper = $element.find('section');
                carouselWrapper = $element[0].querySelector('.slide-wrapper');
                // angular.element(elem.querySelector('.classname'))

                $element.bind('touchmove', touchMove);
                $element.bind('touchend', touchEnd);
            };

            var touchMove = function (e) {
                var diffX = e.touches[0].pageX - touchStartPageX;
                carouselWrapper.style.cssText = '-webkit-transform: translateX(' + diffX + 'px)';
            };

            var touchEnd = function (e) {

                $element.unbind('touchmove', touchMove);
                $element.unbind('touchend', touchEnd);
            };

            $element.bind('touchstart', touchStart);

            $scope.activeSlides = [0, 1, 3, 4, 5];

            maxIndex = $scope.activeSlides.length - 1;

            $scope.slides = [
                {
                    image: 'http://placekitten.com/400/400',
                    title: 'Slide One',
                    body: 'Stats or something',
                    active: false
                },
                {
                    image: 'http://placekitten.com/500/500',
                    title: 'Slide Two',
                    body: 'Stats or something',
                    active: true
                },
                {
                    image: 'http://placekitten.com/300/300',
                    title: 'Slide Three',
                    body: 'Stats or something',
                    active: false
                },
                {
                    image: 'http://placekitten.com/450/450',
                    title: 'Slide Four',
                    body: 'Stats or something',
                    active: false
                },
                {
                    image: 'http://placekitten.com/330/330',
                    title: 'Slide Five',
                    body: 'Stats or something',
                    active: false
                },
                {
                    image: 'http://placekitten.com/300/300',
                    title: 'Slide Three',
                    body: 'Stats or something',
                    active: false
                },
                {
                    image: 'http://placekitten.com/450/450',
                    title: 'Slide Four',
                    body: 'Stats or something',
                    active: false
                },
                {
                    image: 'http://placekitten.com/330/330',
                    title: 'Slide Five',
                    body: 'Stats or something',
                    active: false
                }
            ];

            $scope.changeIndex = function () {
                var nextIndex = $scope.activeSlides[maxIndex] + 1;
                nextIndex = nextIndex === $scope.slides.length - 1 ? 0 : nextIndex;
                $scope.activeSlides.push(nextIndex);
                $scope.activeSlides.splice(0, 1);

                // $timeout(changeIndex, 1000);
            };

            // $timeout(changeIndex, 1000);

        };

        return {
            templateUrl: app.STATIC.DIRECTIVES_PATH + 'team-selector-carousel.html',
            controller: ['$scope', '$element', TeamSelectorCarousel],
            replace: true
        };
    });

})(window, angular);

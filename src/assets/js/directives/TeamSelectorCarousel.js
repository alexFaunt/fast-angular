
/**
 * Team selector carousel
 */

 // HOLY SHIT THIS NEEDS REWRITING

;(function (window, angular) {
    'use strict';

    var app = angular.module(window.appName);

    app.directive('teamSelectorCarousel', function() {

        var TeamSelectorCarousel = function ($scope, $element) {
            var maxIndex;

            var touchStartPageX = null;
            var carouselWrapper = null;
            var startingPosition = 0;
            var delta = 0;

            var amplitude, velocity, timestamp, now, elapsed, ticker, trackChange, trackLast, target;
            var pressed = false;

            var max = -800;
            var newOffset;
            var time = 100;

            var touchStart = function (e) {
                pressed = true;
                touchStartPageX = e.touches[0].pageY;
                carouselWrapper = $element[0].querySelector('.teams');

                delta = 0;
                velocity = 0;
                clearInterval(ticker);
                ticker = setInterval(track, time);

                trackLast = 0;
                trackChange = 0;

                $element.bind('touchmove', touchMove);
                $element.bind('touchend', touchEnd);
            };

            var touchMove = function (e) {
                e.preventDefault();

                delta = e.touches[0].pageY - touchStartPageX;

                newOffset = startingPosition + delta;
                newOffset = newOffset >= 0 ? newOffset/2 : newOffset;
                newOffset = newOffset <= max ? (max + (newOffset-max)/2) : newOffset;

                carouselWrapper.style.cssText = '-webkit-transform: translate3d(0, ' + newOffset + 'px, 0)';
            };

            var track = function () {
                // now = Date.now();
                trackChange = delta - trackLast;
                trackLast = delta;

                var v = 1000 * trackChange / time;
                velocity = 0.8 * v + 0.2 * velocity;
            };

            var touchEnd = function () {
                startingPosition = newOffset;
                pressed = false;

                clearInterval(ticker);
                timestamp = Date.now();

                amplitude = velocity * 0.8;
                target = newOffset + amplitude;

                if (target > 0) {
                    target = 0;
                    amplitude = -newOffset;
                }
                if (target < max) {
                    target = max;
                    amplitude = max - newOffset;
                }

                autoScroll();

                $element.unbind('touchmove', touchMove);
                $element.unbind('touchend', touchEnd);
            };

            var autoScroll = function () {
                if (pressed) {
                    return;
                }
                elapsed = Date.now() - timestamp;
                delta = -amplitude * Math.exp(-elapsed / 200);
                // /console.log('amplitude',amplitude,'delta',delta,'target',target,'newOffset',newOffset,'autoscrolloffset', (target + delta));
                if (delta > 1 || delta < -1) {
                    carouselWrapper.style.cssText = '-webkit-transform: translate3d(0, ' + (target + delta) + 'px, 0)';
                    window.requestAnimationFrame(autoScroll);
                }
                else {
                    carouselWrapper.style.cssText = '-webkit-transform: translate3d(0, ' + (target) + 'px, 0)';
                }
                startingPosition = target + delta;
            };

            $element[0].querySelector('.teams').addEventListener('touchstart', touchStart);

            $scope.activeTeams = [0, 1, 3, 4, 5];

            maxIndex = $scope.activeTeams.length - 1;

            $scope.teams = [
                {
                    image: 'http://placekitten.com/400/400',
                    name: 'Slide One'
                },
                {
                    image: 'http://placekitten.com/500/500',
                    name: 'Slide Two'
                },
                {
                    image: 'http://placekitten.com/300/300',
                    name: 'Slide Three'
                },
                {
                    image: 'http://placekitten.com/450/450',
                    name: 'Slide Four'
                },
                {
                    image: 'http://placekitten.com/330/330',
                    name: 'Slide Five'
                },
                {
                    image: 'http://placekitten.com/300/300',
                    name: 'Slide Three'
                },
                {
                    image: 'http://placekitten.com/450/450',
                    name: 'Slide Four'
                },
                {
                    image: 'http://placekitten.com/330/330',
                    name: 'Slide Five'
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

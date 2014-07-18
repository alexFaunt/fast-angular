
/**
 * Team selector carousel
 */

 // HOLY SHIT THIS NEEDS REWRITING
 // Tidy up
 // make directive
 // use the trigger events
 // expose getters and setters with/without animation
 // sort out edge cases - if you lob it at one end, needs to smash into the end, not gracefully go there
 // snap to list items
 // Check the recursion shit - probs not good.
 // calculate max from elements


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
            var item = 200;
            var newOffset;
            var time = 100;

            var scrollingListIndex = 0;
            var originalClick;


            // Need to make this a global things
            var xform = 'transform';
            ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
                var e = prefix + 'Transform';
                if (typeof document.body.style[e] !== 'undefined') {
                    xform = e;
                    return false;
                }
                return true;
            });


            // RECURSIVE FUNCITON SEEMS DODGE - WORK OUT HOW TO DO THIS PROPER LIEK
            var clicked = function (target) {
                if (target.dataset.href) {
                    window.location.href = window.location.href + '/' + target.dataset.href;
                }
                else if (target === carouselWrapper) {
                    return
                }
                else {
                    clicked(target.parentElement);
                }
            }

            var updateScroll = function (offset) {
                var math = -Math.floor(offset/item)
                var newScrollingIndex = math > 0 ? math : 0;
                if (newScrollingIndex !== scrollingListIndex) {
                    changeIndex(newScrollingIndex);
                }

                carouselWrapper.style[xform] = 'translateY(' + offset + 'px)';
            };

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
                originalClick = Date.now();
            };

            var touchMove = function (e) {
                e.preventDefault();

                delta = e.touches[0].pageY - touchStartPageX;

                newOffset = startingPosition + delta;
                newOffset = newOffset >= 0 ? newOffset/2 : newOffset;
                newOffset = newOffset <= max ? (max + (newOffset-max)/2) : newOffset;

                updateScroll(newOffset);
            };

            var track = function () {
                // now = Date.now();
                trackChange = delta - trackLast;
                trackLast = delta;

                var v = 1000 * trackChange / time;
                velocity = 0.8 * v + 0.2 * velocity;
            };

            var touchEnd = function (e) {
                startingPosition = newOffset;
                pressed = false;

                $element.unbind('touchmove', touchMove);
                $element.unbind('touchend', touchEnd);


                clearInterval(ticker);
                timestamp = Date.now();

                if (delta === 0) {
                    if ((timestamp - originalClick) < 170){
                        clicked(e.target);
                    }
                    return;
                }

                amplitude = velocity * 0.8;
                target = newOffset + amplitude;
                target = Math.round(target/item) * item;
                amplitude = target - newOffset;


                if (target > 0) {
                    target = 0;
                    amplitude = -newOffset;
                }
                if (target < max) {
                    target = max;
                    amplitude = max - newOffset;
                }



                autoScroll();
            };

            var autoScroll = function () {
                if (pressed) {
                    return;
                }
                elapsed = Date.now() - timestamp;
                delta = -amplitude * Math.exp(-elapsed / 200);
                // /console.log('amplitude',amplitude,'delta',delta,'target',target,'newOffset',newOffset,'autoscrolloffset', (target + delta));
                if (delta > 1 || delta < -1) {
                    updateScroll(target + delta);
                    startingPosition = target + delta;
                    window.requestAnimationFrame(autoScroll);
                }
                else {
                    updateScroll(target);
                    startingPosition = target;
                }
            };

            var changeIndex = function (idx) {
                scrollingListIndex = idx;
                console.log('update ticker', idx);
            };

            $element[0].querySelector('.teams').addEventListener('touchstart', touchStart);

            $scope.activeTeams = [0, 1, 3, 4, 5];

            maxIndex = $scope.activeTeams.length - 1;

            $scope.teams = [
                {
                    id: 0,
                    image: 'http://placekitten.com/400/400',
                    name: 'Team One'
                },
                {
                    id: 0,
                    image: 'http://placekitten.com/500/500',
                    name: 'Team Two'
                },
                {
                    id: 0,
                    image: 'http://placekitten.com/300/300',
                    name: 'Team Three'
                },
                {
                    id: 0,
                    image: 'http://placekitten.com/450/450',
                    name: 'Team Four'
                },
                {
                    id: 0,
                    image: 'http://placekitten.com/330/330',
                    name: 'Team Five'
                },
                {
                    id: 0,
                    image: 'http://placekitten.com/300/300',
                    name: 'Team Three'
                },
                {
                    id: 0,
                    image: 'http://placekitten.com/450/450',
                    name: 'Team Four'
                },
                {
                    id: 0,
                    image: 'http://placekitten.com/330/330',
                    name: 'Team Five'
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

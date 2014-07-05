
/**
 * Games list directive
 */

;(function (window, angular) {
    'use strict';

    var app = angular.module(window.appName);

    app.directive('gamesList', function() {

        var GamesListCtrl = function ($scope) {

            var GAME_STATES = {
                FIXTURE: {
                    showScore: false,
                    showVersus: true
                },
                RESULT: {
                    showScore: true,
                    showVersus: false
                },
                LIVE: {
                    showScore: true,
                    showVersus: false
                }
            };

            var LIST_STATES = {
                DEFAULT: {
                    title: 'TITLE_GAMES'
                },
                FIXTURES: {
                    title: 'TITLE_FIXTURES'
                },
                RESULTS: {
                    title: 'TITLE_RESULTS'
                },
                LIVE: {
                    title: 'TITLE_LIVE'
                }
            };

            $scope.LIST_STATE = LIST_STATES.DEFAULT;

            $scope.games = [{
                    date: '01/01/2001',
                    time: '09:00',
                    state: GAME_STATES.RESULT,
                    teams: {
                        home: {
                            id: 0,
                            name: 'Man Utd.',
                            goals: [{
                                    player: {
                                        id: 0,
                                        name: 'player'
                                    },
                                    time: '66mins'
                                },
                                {
                                    player: {
                                        id: 0,
                                        name: 'player'
                                    },
                                    time: '89mins'
                                }
                            ]
                        },
                        away: {
                            id: 0,
                            name: 'Everton',
                            goals: []
                        }
                    }
                },
                {
                    date: '01/01/2001',
                    time: '09:00',
                    state: GAME_STATES.FIXTURE,
                    teams: {
                        home: {
                            id: 0,
                            name: 'Man Utd.',
                            goals: []
                        },
                        away: {
                            id: 0,
                            name: 'Everton',
                            goals: []
                        }
                    }
                }
            ];

        };

        return {
            templateUrl: app.STATIC.DIRECTIVES_PATH + 'games-list.html',
            replace: true,
            controller: GamesListCtrl
        };
    });

})(window, angular);
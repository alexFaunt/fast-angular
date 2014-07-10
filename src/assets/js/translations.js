
/**
 * Translations config
 */

;(function (window, angular) {
    'use strict';

    // TODO - I concatted all the files from demo to make lib cause actual lib sucked.
    // maybe able to optimize - i think it compiled a bunch of local storage + cookie crap
    // ang registed a controller filter service directive - all that shit. dno why. cut it back
    angular.module(window.appName).config(function ($translateProvider) {
        $translateProvider
            .useStaticFilesLoader({
                prefix: 'translations/',
                suffix: '.json'
            })
            .preferredLanguage('en')
            .useLocalStorage();
            // .fallbackLanguage(['fr']); TODO - like in a million years
    });

})(window, angular);
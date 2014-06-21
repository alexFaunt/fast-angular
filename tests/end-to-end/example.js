'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */


describe('Banner mesasge filter', function() {
    
    beforeEach(function() {
        browser().navigateTo('http://localhost/grunt-angular-tdd/src/index.html');
    });

    it('should filter the banner messages as user types into the search box', function() {
        expect(repeater('.banner-message').count()).toBe(3);

        input('query').enter('1');
        expect(repeater('.banner-message').count()).toBe(1);

        input('query').enter('2'); 
        expect(repeater('.banner-message').count()).toBe(1);
    });
});

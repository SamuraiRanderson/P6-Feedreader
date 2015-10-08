/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

        /* This is our first test suite - a test suite just contains
        * a related set of tests. This suite is all about the RSS
        * feeds definitions, the allFeeds variable in our application.
        */

    describe('RSS Feeds', function() {

        /* This is a test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();// checking that (allFeeds) is defined
            expect(allFeeds.length).not.toBe(0);// checking that (allFeeds) is populated
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('has a URL defined', function(){
            var len = allFeeds.length;
            for (var i = 0; i < len; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
         });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('has a Name defined', function() {
            var len = allFeeds.length;
            for (var i = 0; i < len; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });

    });

    describe('The Menu', function() {

        var body = $('body');

        /* This is a test that ensures the menu element is
         * hidden by default. The test analyzes the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('The menu element is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true); // looking for 'menu-hidden' class
        });

        /* This is a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('The menu changes visability when the menu icon is clicked', function() {
            $('.icon-list').trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);// expectation one: when clicked the menu is shown
            $('.icon-list').trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);// expectation two: when clicked again the menu is hidden

        });

    });

    describe('Initial Entries', function() {

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

         beforeEach(function(done) {
            loadFeed(0, done);
         });

         it('There is at least a single ".entry" element in the ".feed" container', function(){
            var entry = $('.feed .entry');
            expect(entry.length).toBeGreaterThan(0); // Checking the feed to see that it's populated
         });

    });

    describe('New Feed Selection', function() {

        var entry;
        var newEntry;

        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        beforeEach(function(done) {
            $('.feed').empty();

        /* Checks the Udacity Feed first entry and the first entry
         * for CSS Tricks
         */

        loadFeed(0, function() {
            entry = $('.entry')[0].innerText;
            loadFeed(1, function() {
                newEntry = $('.entry')[0].innerText;
                done();
            });
        });
        });

        it('Actually changes when a new feed is loaded', function() {
            expect(entry).not.toEqual(newEntry);
        });

    });

}());
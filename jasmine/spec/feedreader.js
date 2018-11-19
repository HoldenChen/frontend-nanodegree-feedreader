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
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('each feed url  not empty', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        it('each feed name not empty', function () {
            for (const argument of allFeeds) {
                expect(argument.name).toBeDefined();
                expect(argument.name.length).not.toBe(0);
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
    });

    describe("The menu", function () {

        it('menu sholud be hidden by default', function () {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

        it('menu should able to hidden or show after click icon', function () {
            const menuIcon = $(".menu-icon-link");
            menuIcon.click();
            expect($("body").hasClass("menu-hidden")).toBe(false);
            menuIcon.click();
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

    });



    describe('Initial Entries', function () {
       let title ;
       beforeEach(function (done) {
           loadFeed(0,function(){
               title = $('.feed');
               done();
           })
       });
        it('loadFeed work as expected', function () {
            expect(title.find(".entry").length).not.toBe(0);
        });
    });


    describe('New Feed Selection', function () {
        let oldtitle;
        let newtitle;
        //第一次加载第一个条目，并记录下加载完成后，对应条目的标题内容
        beforeEach(function(done){

            //设置更长的超时时间，避免网络较慢导致的超时。
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            loadFeed(0,function(){
                oldtitle = $(".header-title").text();
                done();

                //加载完第一个条目后，加载第二个条目，标题内容。
                loadFeed(1,function () {
                    newtitle = $(".header-title").text();
                    done();
                })
            })
        });


        it('content actually changed after new selection', function () {
            //比对两次标题内容是否改变。
            expect(oldtitle).not.toBe(newtitle);
        });
    });
}());

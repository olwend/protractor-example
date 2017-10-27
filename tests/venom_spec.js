//venom_spec.js
describe('venom interactive App', function() {
// put these steps before all
	// it ('should have a screensaver', function() {
	// 	browser.get('file:///C:/Projects/nhm-gallery-interactive-venom-papyrus/index.html');
	// 	expect(browser.getTitle()).toEqual('Images of Nature interactive');
	// 	browser.driver.sleep(1000);
	// 	// callback(); - should use callback()
	// });

	beforeEach(function() {
		// browser.get('file:///C:/Projects/nhm-gallery-interactive-venom-papyrus/index.html');
		browser.get('file:///Users/DOE/Projects/nhm-gallery-interactive-venom-papyrus/index.html');
		browser.driver.sleep(1000);

	});

	it ('should go to landing when screensaver is clicked', function(callback){
		element(by.id('content')).click();
		expect($('.flex-item').isPresent()).toBeTruthy();
		callback();
	});

	it ('should have title Brooklyn Papyrus and other content', function(){
		element(by.id('content')).click();
		browser.driver.sleep(1000);
		expect(element(by.css('h1')).getText()).toEqual('Brooklyn Papyrus');
		expect(element(by.css('h4')).getText()).toEqual('Images courtesy of Brooklyn Museum. Bequest of Theodora Wilbur from the collection of her father, Charles Edwin Wilbour, 47.218.85a-f/47.218.48a-f');
	});

	it ('should go to Symptoms & Outcomes when box is mouse clicked', function(){
		element(by.id('content')).click();
		browser.driver.sleep(1000);
		element(by.id('1')).click();
 		expect(element(by.css('h1')).getText()).toEqual('Symptoms and outcome');
	});

  it ('should go to Treatments when box is mouse clicked', function(){
		element(by.id('content')).click();
		browser.driver.sleep(1000);
		element(by.id('2')).click();
		browser.driver.sleep(1000);
		expect(element(by.css('h3')).getText()).toEqual('Select a number to see the translation of the hieroglyphics.');
	});

	it ('should stay on landing page when clicking out of boxes', function(){
		element(by.id('content')).click();
		browser.driver.sleep(1000);
		expect(element(by.css('h1')).getText()).toEqual('Brooklyn Papyrus');
	});

	// it ('should go to Symptoms & Outcomes when box is touched', function(){

	// });

	// it ('should go to Treatments when box is touched', function(){

	// });

	// it ('should stay on landing page when touching screen out of boxes', function(){
	//
	// });
	//
	// it ('should contain a micrio canvas')
	// it ('should contain markers')
	// it ('should contain a footer')
	// it ('should have events xyz when marker clicked')
	// it('should revert to screensaver after e.g. 6 secs')

	// stress test - E2E random run through repeat of all these

});

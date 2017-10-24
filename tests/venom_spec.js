//venom_spec.js
describe('venom interactive App', function() {
// put these steps before all
	// it ('should have a screensaver', function() {
	// 	browser.get('file:///C:/Projects/nhm-gallery-interactive-venom-papyrus/index.html');
	// 	expect(browser.getTitle()).toEqual('Images of Nature interactive');
	// 	browser.driver.sleep(1000);
	// 	// callback(); - should use callback()
	// });


	it ('should go to landing when checked', function(callback){
		browser.get('file:///C:/Projects/nhm-gallery-interactive-venom-papyrus/index.html');
		element(by.id('content')).click();
		browser.driver.sleep(1000);
		expect($('.flex-item').isPresent()).toBeTruthy();
		callback();
	});

	it('clicking on S&O goes to S&O Url'){
		browser.actions().
			mouseDown(element(by.id('#content > flex-container-1'))).
	// expect URL to be....
			
	}

	it('touch pad on S&O goes to S&O Url'){
		browser.touchActions().
			tap(element(by.id('#content > flex-container-1'))).
	// expect URL to be....	
})
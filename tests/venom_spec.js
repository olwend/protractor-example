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
		browser.get('file:///C:/Projects/nhm-gallery-interactive-venom-papyrus/index.html');
		browser.driver.sleep(1000);
			
	});


	it ('should go to landing when checked', function(callback){
		element(by.id('content')).click();
		expect($('.flex-item').isPresent()).toBeTruthy();
		callback();
	});

	it ('should have title Brooklyn Papyrus', function(){
		element(by.id('content')).click();
		browser.driver.sleep(1000);
		expect(element(by.css('h1')).getText()).toEqual('Brooklyn Papyrus');
	});

	it ('should go to Symptoms & Outcomes when box is mouse clicked', function(){

	});

	it ('should go to Treatments when box is mouse clicked', function(){

	});

	it ('should stay on landing page when clicking out of boxes', function(){

	});

	it ('should go to Symptoms & Outcomes when box is touched', function(){

	});

	it ('should go to Treatments when box is touched', function(){

	});

	it ('should stay on landing page when touching screen out of boxes', function(){

	});



});

// 	it ('clicking on S&O goes to S&O Url'){
// 		browser.actions().
// 			mouseDown(element(by.id('#content > flex-container-1'))).
// 	// expect URL to be....
			
// 	}

// 	it ('touch pad on S&O goes to S&O Url'){
// 		browser.touchActions().
// 			tap(element(by.id('#content > flex-container-1'))).
// 	// expect URL to be....	
// }
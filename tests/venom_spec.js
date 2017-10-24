//venom_spec.js
describe('venom interactive App', function() {
	
	it ('should have a title', function() {
		browser.get('file:///C:/Projects/nhm-gallery-interactive-venom-papyrus/index.html');

		expect(browser.getTitle()).toEqual('Images of Nature interactive');
	});
});
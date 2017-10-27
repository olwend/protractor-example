exports.config = {
	framework: 'jasmine2',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	// directConnect: true,
	capabilities: {
		browserName: 'chrome',
		chromeOptions: {
			args: ['allow-file-access-from-files']
  		}
	},

	specs: ['venom_spec.js'],


	onPrepare: function() {
			// browser.resetUrl = 'file:///C:/Projects/nhm-gallery-interactive-venom-papyrus/index.html#/screensaver';
			browser.resetUrl = 'file:///Users/DOE/Projects/nhm-gallery-interactive-venom-papyrus/index.html#/screensaver'
			},
			// /Users/DOE/Projects/nhm-gallery-interactive-venom-papyrus


	jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  }
}

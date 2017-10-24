exports.config = {
	framework: 'jasmine',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	capabilities: {
		browserName: 'chrome',
		chromeOptions: {
			args: ['allow-file-access-from-files']
  		}
	},

	specs: ['venom_spec.js'],
		
	
	onPrepare: function() {
			browser.resetUrl = 'file:///C:/Projects/nhm-gallery-interactive-venom-papyrus/index.html#/screensaver';
			},


	jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  }
}




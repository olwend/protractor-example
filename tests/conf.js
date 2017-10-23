exports.config = {
  seleniumAddress: 'http://localhost:4445/wd/hub',

  multiCapabilities: {
  	'browserName': 'chrome'
	}, {
		'browserName': 'firefox'
	}]

  specs: ['todo-spec.js'],
  ['todo-two.js'],
	},

  jasmineNodeOpts: {
    showColors: true
  }
};
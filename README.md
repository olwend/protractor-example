# nhm-gallery-interactive-venom-papyrus

A repository for the gallery interactive for the Venom temporary exhibition (South Kensington)

## Protractor tests set up

Protractor uses a Selenium Server to act as a proxy between test script web driver API commands and the browser(s) configured.
See http://www.protractortest.org/#/

This is a Chrome app so test configuration uses directConnect for speed.

```capabilities: {
  browserName: 'chrome',
  chromeOptions: {
    args: ['allow-file-access-from-files']
    }

Ensure that properties on chrome include  --args allow-file-access-from-files ```
```
## Running tests

Assuming you have installed webdriver-manager as per instructions above
1. Ensure that venom_conf.js & venom_spec.js list the correct path to your local files in venom repo
browser.
```resetUrl = 'file:///C:/Projects/nhm-gallery-interactive-venom-papyrus/index.html#/screensaver';```

2. cd to tests folder - enter ``` webdriver-manager start``` on command line
Tests will run on screen and output results as "...F.." to terminal window

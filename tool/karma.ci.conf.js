/**
 * @file karma test config using travis
 * @author cxtom <cxtom2008@gmail.com>
 */

/* eslint-disable no-console */

var _ = require('lodash');

var karmaConfig = require('./karma/config');

var customLaunchers = {
    slChrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '48'
    },
    slFirefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '45'
    },
    slIE11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
    },
    slIE10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8',
        version: '10'
    },
    slIE9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '9'
    },
    slEdge: {
        base: 'SauceLabs',
        platform: 'Windows 10',
        browserName: 'microsoftedge'
    },
    slIOS: {
        base: 'SauceLabs',
        browserName: '',
        deviceName: ' iPhone 6',
        platformVersion: '9.1',
        platformName: 'iOS'
    },
    slAndroid: {
        base: 'SauceLabs',
        browserName: '',
        version: '4.3',
        platformVersion: '4.3',
        platformName: 'Android'
    }
};

module.exports = function (config) {

    // Use ENV vars on Travis and sauce.json locally to get credentials
    if (!process.env.SAUCE_USERNAME) {
        process.env.SAUCE_USERNAME = require('./sauce').username;
        process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
    }

    config.set(_.extend(karmaConfig, {
        frameworks: ['browserify', 'mocha', 'es5-shim'],
        sauceLabs: {
            'testName': 'Web App Unit Tests',
            'public': 'public'
        },
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        reporters: ['coverage', 'mocha', 'saucelabs'],
        singleRun: true
    }));
};

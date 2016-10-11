/**
 * @file karma test config using travis
 * @author cxtom <cxtom2008@gmail.com>
 */

/* eslint-disable no-console */

var _ = require('lodash');

var karmaConfig = require('./karma/config');

var customLaunchers = {
    // pc
    slChrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Windows 7'
    },
    slFirefox: {
        base: 'SauceLabs',
        browserName: 'firefox'
    },
    // slIE11: {
    //     base: 'SauceLabs',
    //     browserName: 'internet explorer',
    //     platform: 'Windows 8.1',
    //     version: '11'
    // },
    // slIE10: {
    //     base: 'SauceLabs',
    //     browserName: 'internet explorer',
    //     platform: 'Windows 8',
    //     version: '10'
    // },
    slIE9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '9'
    },
    // slMacSafari: {
    //     base: 'SauceLabs',
    //     browserName: 'safari',
    //     platform: 'OS X 10.10'
    // },
    // mobile
    slIosSafari: {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'OS X 10.9',
        version: '9.1'
    },
    slAndroid: {
        base: 'SauceLabs',
        browserName: 'android',
        platform: 'Linux',
        version: '4.3'
    }
};

module.exports = function (config) {

    // Use ENV vars on Travis and sauce.json locally to get credentials
    if (!process.env.SAUCE_USERNAME) {
        process.env.SAUCE_USERNAME = require('./sauce').username;
        process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
    }

    config.set(_.extend(karmaConfig, {
        sauceLabs: {
            'testName': 'Melon Core Unit Tests',
            'public': 'public'
        },
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        reporters: ['coverage', 'mocha', 'saucelabs'],
        singleRun: true
    }));
};

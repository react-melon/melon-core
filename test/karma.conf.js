/**
 * @file karma test common config
 * @author ludafa <ludafa@outlook.com>
 */

const path = require('path');

module.exports = {

    basePath: path.join(__dirname, '../'),

    frameworks: [
        'jasmine'
    ],

    files: [
        'test/index.js'
    ],

    browsers: [
        'Chrome'
    ],

    preprocessors: {
        'src/**/*.js': ['coverage'],
        'test/**/*.js': ['webpack']
    },

    webpack: {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        },
        devtool: 'inline-source-map'
    },

    webpackMiddleware: {
        stats: 'errors-only'
    },

    autoWatch: true,

    // logLevel: config.LOG_DEBUG,
    reporters: ['progress', 'coverage'],

    coverageReporter: {
        dir: path.join(__dirname, './coverage'),
        reporters: [
            // reporters not supporting the `file` property
            {type: 'html'},
            {type: 'lcov', subdir: 'lcov'}
        ]
    },

    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true

};

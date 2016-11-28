/**
 * @file karma test common config
 * @author ludafa <ludafa@outlook.com>
 */

const path = require('path');

module.exports = {

    basePath: path.join(__dirname, '../'),

    frameworks: [
        'jasmine',
        'jasmine-expect-jsx'
    ],

    files: [
        'test/spec/**/*.spec.js'
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
            preLoaders: [{
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }]
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

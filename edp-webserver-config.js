/**
 * @file config edp-webserver
 * @author EFE
 */

/* globals home, redirect, content, empty, autocss, file, less, stylus, proxyNoneExists */


exports.port = 8848;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;

var babel = require('babel-core');

exports.getLocations = function () {
    return [
        {
            location: /\/$/,
            handler: home('index.html')
        },
        {
            location: /^\/redirect-local/,
            handler: redirect('redirect-target', false)
        },
        {
            location: /^\/redirect-remote/,
            handler: redirect('http://www.baidu.com', false)
        },
        {
            location: /^\/redirect-target/,
            handler: content('redirectd!')
        },
        {
            location: '/empty',
            handler: empty()
        },
        {
            location: /\.css($|\?)/,
            handler: [
                autocss()
            ]
        },
        {
            location: /\.less($|\?)/,
            handler: [
                file(),
                less()
            ]
        },
        {
            location: /\.styl($|\?)/,
            handler: [
                file(),
                stylus()
            ]
        },
        {
            location: function (context) {
                return /^\/(src|example).*?\.js($|\?)/.test(context.url);
            },
            handler: [
                file(),
                function (context) {
                    try {
                        context.content = babel
                            .transform(
                                context.content,
                                {
                                    compact: false,
                                    ast: false,
                                    presets: [
                                        'es2015',
                                        'react'
                                    ],
                                    plugins: [
                                        'external-helpers-2',
                                        'transform-object-rest-spread'
                                    ]
                                }
                            )
                            .code;
                    }
                    catch (e) {
                        console.error(e.stack);
                        context.status = 500;
                    }
                },
                function amdify(context) {
                    context.content =  ''
                        + 'define(function (require, exports, module) {\n'
                        +     context.content
                        + '\n});';
                }
            ]
        },
        {
            location: /^.*$/,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

/* eslint-disable guard-for-in */
exports.injectResource = function (res) {
    for (var key in res) {
        global[key] = res[key];
    }
};

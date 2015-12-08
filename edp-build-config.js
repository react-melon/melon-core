/**
 * @file config edp-build
 * @author EFE
 */

/* globals
    LessCompiler, CssCompressor, JsCompressor,
    PathMapper, AddCopyright, ModuleCompiler,
    TplMerge, BabelProcessor,
    AmdWrapper
*/

exports.input = __dirname;

var path = require('path');
exports.output = path.resolve(__dirname, 'output');

// var moduleEntries = 'html,htm,phtml,tpl,vm,js';
// var pageEntries = 'html,htm,phtml,tpl,vm';

exports.getProcessors = function () {
    var lessProcessor = new LessCompiler();
    var cssProcessor = new CssCompressor();
    var moduleProcessor = new ModuleCompiler({
        bizId: 'melon-core'
    });
    var jsProcessor = new JsCompressor();
    var pathMapperProcessor = new PathMapper();
    var addCopyright = new AddCopyright();

    var amdWrapper = new AmdWrapper({
        files: ['src/**/*.js']
    });

    var amdBabel = new BabelProcessor({
        files: ['src/**/*.js'],
        compileOptions: {
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
    });

    var commonjsBabel = new BabelProcessor({
        files: ['src/**/*.js'],
        compileOptions: {
            compact: false,
            ast: false,
            presets: [
                'react'
            ],
            plugins: [
                'external-helpers-2',
                'transform-object-rest-spread',
                'transform-es2015-destructuring',
                'transform-es2015-block-scoped-functions',
                'transform-es2015-block-scoping',
                'transform-es2015-spread',
                'transform-es2015-parameters'
            ]
        }
    });

    return {
        amd: [
            amdBabel,
            amdWrapper,
            moduleProcessor,
            pathMapperProcessor
        ],
        commonjs: [
            commonjsBabel,
            pathMapperProcessor
        ],
        release: [
            lessProcessor, cssProcessor, moduleProcessor,
            jsProcessor, pathMapperProcessor, addCopyright
        ]
    };
};

exports.exclude = [
    '*.md',
    'dist',
    '*.html',
    'lib',
    'README',
    '.*',
    'dep',
    'bower.json',
    'example',
    'tool',
    'doc',
    'test',
    'module.conf',
    'node_modules',
    'dep/packages.manifest',
    'dep/*/*/test',
    'dep/*/*/doc',
    'dep/*/*/demo',
    'dep/*/*/tool',
    'dep/*/*/*.md',
    'dep/*/*/package.json',
    'edp-*',
    '.edpproj',
    '.svn',
    '.git',
    '.gitignore',
    '.idea',
    '.project',
    'Desktop.ini',
    'Thumbs.db',
    '.DS_Store',
    '*.tmp',
    '*.bak',
    '*.swp'
];

/* eslint-disable guard-for-in */
exports.injectProcessor = function (processors) {
    for (var key in processors) {
        global[key] = processors[key];
    }
    global.BabelProcessor = require('./tool/BabelProcessor.js');
    global.AmdWrapper = require('./tool/AmdWrapper.js');
};

define('melon-core/Link', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('Link');
    function Link(props) {
        return React.createElement('a', babelHelpers.extends({}, props, { className: cx(props).build() }));
    }
    module.exports = Link;
});
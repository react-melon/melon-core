define('melon-core/breadcrumb/Item', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'melon-classname'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('BreadcrumbItem');
    function BreadcrumbItem(props) {
        return React.createElement('a', babelHelpers.extends({}, props, { className: cx(props).build() }));
    }
    BreadcrumbItem.propTypes = { href: React.PropTypes.string };
    module.exports = BreadcrumbItem;
});
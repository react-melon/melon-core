define('melon-core/Breadcrumb', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname',
    './breadcrumb/Item'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('Breadcrumb');
    var Item = require('./breadcrumb/Item');
    var Breadcrumb = function Breadcrumb(props) {
        var children = props.children;
        var rest = babelHelpers.objectWithoutProperties(props, ['children']);
        return React.createElement('div', babelHelpers.extends({}, rest, { className: cx(props).build() }), React.Children.map(children, function (child, index) {
            return child && child.type === Item ? React.cloneElement(child, {
                key: index,
                level: index
            }) : null;
        }));
    };
    Breadcrumb.Item = Item;
    module.exports = Breadcrumb;
});
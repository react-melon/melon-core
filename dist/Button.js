define('melon-core/Button', [
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
    var cx = require('melon-classname').create('Button');
    function Button(props) {
        var label = props.label;
        var children = props.children;
        var disabled = props.disabled;
        var others = babelHelpers.objectWithoutProperties(props, [
            'label',
            'children',
            'disabled'
        ]);
        var className = cx(props).addVariants({ icon: React.Children.count(children) === 1 && (typeof children === 'undefined' ? 'undefined' : babelHelpers.typeof(children)) === 'object' && children.type.displayName === 'Icon' }).build();
        return React.createElement('button', babelHelpers.extends({}, others, {
            disabled: disabled,
            className: className
        }), label || children);
    }
    module.exports = Button;
});
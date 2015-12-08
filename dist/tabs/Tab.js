define('melon-core/tabs/Tab', [
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
    var cx = require('melon-classname').create('TabsItem');
    function Tab(props) {
        var selected = props.selected;
        var disabled = props.disabled;
        var label = props.label;
        var others = babelHelpers.objectWithoutProperties(props, [
            'selected',
            'disabled',
            'label'
        ]);
        return React.createElement('li', babelHelpers.extends({}, others, {
            className: cx(props).addStates({
                selected: selected,
                disabled: disabled
            }).build()
        }), label);
    }
    module.exports = Tab;
});
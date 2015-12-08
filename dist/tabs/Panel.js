define('melon-core/tabs/Panel', [
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
    var cx = require('melon-classname').create('TabsPanel');
    function TabsPanel(props) {
        var active = props.active;
        var others = babelHelpers.objectWithoutProperties(props, ['active']);
        return React.createElement('div', babelHelpers.extends({}, others, { className: cx(props).addStates({ active: active }).build() }));
    }
    module.exports = TabsPanel;
});
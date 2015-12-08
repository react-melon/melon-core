define('melon-core/ToolBar', [
    'require',
    'exports',
    'module',
    'react',
    'melon-classname'
], function (require, exports, module) {
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('ToolBar');
    var ToolBar = React.createClass({
        displayName: 'ToolBar',
        render: function render() {
            var props = this.props;
            var children = props.children;
            return React.createElement('div', { className: cx(props).build() }, children);
        }
    });
    module.exports = ToolBar;
});
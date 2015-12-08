define('melon-core/dialog/DialogWindow', [
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
    var PropTypes = React.PropTypes;
    var cx = require('melon-classname').create('DialogWindow');
    var DialogWindow = React.createClass({
        displayName: 'DialogWindow',
        propTypes: {
            top: PropTypes.number,
            footer: PropTypes.element,
            title: PropTypes.element
        },
        render: function render() {
            var _props = this.props;
            var children = _props.children;
            var top = _props.top;
            var title = _props.title;
            var footer = _props.footer;
            var others = babelHelpers.objectWithoutProperties(_props, [
                'children',
                'top',
                'title',
                'footer'
            ]);
            return React.createElement('div', babelHelpers.extends({}, others, {
                style: {
                    transform: 'translate(0, ' + top + 'px)',
                    WebkitTransform: 'translate(0, ' + top + 'px)',
                    msTransform: 'translate(0, ' + top + 'px)',
                    MozTransform: 'translate(0, ' + top + 'px)'
                },
                className: cx(this.props).build()
            }), title, children, footer);
        }
    });
    module.exports = DialogWindow;
});
define('melon-core/textbox/Input', [
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
    var cx = require('melon-classname').create('TextBoxInput');
    var TextBoxInput = React.createClass({
        displayName: 'TextBoxInput',
        render: function render() {
            var _props = this.props;
            var multiline = _props.multiline;
            var className = _props.className;
            var rows = _props.rows;
            var isFocus = _props.isFocus;
            var rest = babelHelpers.objectWithoutProperties(_props, [
                'multiline',
                'className',
                'rows',
                'isFocus'
            ]);
            var tag = multiline ? 'textarea' : 'input';
            return React.createElement(tag, babelHelpers.extends({}, rest, {
                className: cx(this.props).addStates({ focus: isFocus }).build(),
                rows: multiline ? rows : null
            }));
        }
    });
    TextBoxInput.defaultProps = { rows: 2 };
    module.exports = TextBoxInput;
});
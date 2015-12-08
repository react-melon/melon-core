define('melon-core/Toggle', [
    'require',
    'exports',
    'module',
    'react',
    'melon-classname',
    './Validity',
    './createInputComponent'
], function (require, exports, module) {
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('Toggle');
    var Validity = require('./Validity');
    var Toggle = React.createClass({
        displayName: 'Toggle',
        onChange: function onChange(e) {
            var _props = this.props;
            var disabled = _props.disabled;
            var readOnly = _props.readOnly;
            var onChange = _props.onChange;
            var trueValue = _props.trueValue;
            var falseValue = _props.falseValue;
            if (disabled || readOnly) {
                return;
            }
            onChange({
                type: 'change',
                target: this,
                value: e.target.checked ? trueValue : falseValue
            });
        },
        renderBar: function renderBar() {
            return React.createElement('div', { className: cx().part('bar-container').build() }, React.createElement('div', { className: cx().part('bar').build() }), React.createElement('div', { className: cx().part('circle').build() }));
        },
        render: function render() {
            var props = this.props;
            var onChange = this.onChange;
            var name = props.name;
            var value = props.value;
            var trueValue = props.trueValue;
            var validity = props.validity;
            var checked = value === trueValue;
            return React.createElement('label', { className: cx(props).addStates({ checked: checked }).build() }, React.createElement('input', {
                type: 'checkbox',
                name: name,
                value: value,
                onChange: onChange,
                checked: checked
            }), this.renderBar(), React.createElement(Validity, { validity: validity }));
        }
    });
    Toggle.defaultProps = {
        trueValue: 'on',
        falseValue: ''
    };
    var PropTypes = React.PropTypes;
    Toggle.propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        trueValue: PropTypes.string.isRequired,
        falseValue: PropTypes.string,
        onChange: PropTypes.func
    };
    module.exports = require('./createInputComponent').create(Toggle);
});
define('melon-core/region/Selector', [
    'require',
    'exports',
    'module',
    'react',
    '../Icon',
    'melon-classname'
], function (require, exports, module) {
    'use strict';
    var React = require('react');
    var Icon = require('../Icon');
    var cx = require('melon-classname').create('RegionSelector');
    var RegionSelector = React.createClass({
        displayName: 'RegionSelector',
        onClick: function onClick(e) {
            var _props = this.props;
            var onChange = _props.onChange;
            var checked = _props.checked;
            onChange && onChange({
                value: !checked,
                target: this
            });
        },
        getIcon: function getIcon(isChecked) {
            var icons = RegionSelector.Icons;
            return icons[isChecked ? 'checked' : 'unchecked'];
        },
        render: function render() {
            var _props2 = this.props;
            var checked = _props2.checked;
            var disabled = _props2.disabled;
            var hasInput = _props2.hasInput;
            var value = _props2.value;
            var name = _props2.name;
            var label = _props2.label;
            var id = _props2.id;
            var className = cx(this.props).addStates({ checked: checked }).build();
            return React.createElement('label', {
                className: className,
                'data-region-id': id,
                onClick: this.onClick
            }, hasInput ? React.createElement('input', {
                disabled: disabled,
                checked: checked,
                type: 'checkbox',
                value: value,
                name: name
            }) : null, React.createElement(Icon, { icon: this.getIcon(checked) }), label);
        }
    });
    RegionSelector.defaultProps = { hasInput: false };
    var PropTypes = React.PropTypes;
    RegionSelector.propTypes = {
        label: PropTypes.string,
        value: PropTypes.string,
        checked: PropTypes.bool,
        name: PropTypes.string,
        disabled: PropTypes.bool,
        id: PropTypes.string,
        hasInput: PropTypes.bool,
        onChange: PropTypes.func
    };
    RegionSelector.Icons = {
        checked: 'check-box',
        unchecked: 'check-box-outline-blank'
    };
    module.exports = RegionSelector;
});
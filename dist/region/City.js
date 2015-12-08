define('melon-core/region/City', [
    'require',
    'exports',
    'module',
    'react',
    'melon-classname',
    './Selector'
], function (require, exports, module) {
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('RegionCity');
    var Selector = require('./Selector');
    var PropTypes = React.PropTypes;
    var RegionCity = React.createClass({
        displayName: 'RegionCity',
        onSelectorChange: function onSelectorChange(e) {
            var value = e.value;
            var datasource = this.props.datasource;
            var onChange = this.props.onChange;
            datasource.selected = value;
            onChange && onChange({ data: datasource });
        },
        render: function render() {
            var datasource = this.props.datasource;
            return React.createElement('li', { className: cx(this.props).build() }, React.createElement(Selector, {
                label: datasource.text,
                id: datasource.id,
                checked: datasource.selected,
                onChange: this.onSelectorChange
            }));
        }
    });
    RegionCity.propTypes = {
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        datasource: PropTypes.object
    };
    module.exports = RegionCity;
});
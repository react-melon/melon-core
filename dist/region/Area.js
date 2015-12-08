define('melon-core/region/Area', [
    'require',
    'exports',
    'module',
    'react',
    'melon-classname',
    './Selector',
    './Province',
    './City',
    './helper',
    'underscore'
], function (require, exports, module) {
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('RegionArea');
    var Selector = require('./Selector');
    var Province = require('./Province');
    var City = require('./City');
    var helper = require('./helper');
    var _ = require('underscore');
    var PropTypes = React.PropTypes;
    var RegionArea = React.createClass({
        displayName: 'RegionArea',
        onSelectorChange: function onSelectorChange(e) {
            var value = e.value;
            var data = this.props.datasource;
            helper[value ? 'selectAll' : 'cancelAll'](data);
            var onChange = this.props.onChange;
            onChange && onChange({ data: data });
        },
        onProvinceChange: function onProvinceChange(index, e) {
            var data = e.data;
            var datasource = this.props.datasource;
            datasource.children[index] = data;
            helper.isAllSelected(datasource);
            var onChange = this.props.onChange;
            onChange && onChange({ data: datasource });
        },
        onCityChange: function onCityChange(pIndex, cIndex, e) {
            var data = e.data;
            var datasource = this.props.datasource;
            var p = datasource.children[pIndex];
            p.children[cIndex] = data;
            helper.isAllSelected(p);
            var onChange = this.props.onChange;
            onChange && onChange({ data: datasource });
        },
        renderProvince: function renderProvince(child, index) {
            return React.createElement(Province, {
                key: index,
                datasource: child,
                onChange: this.onProvinceChange.bind(this, index)
            }, _.isArray(child.children) && child.children.length > 0 ? _.map(child.children, this.renderCity.bind(this, index)) : null);
        },
        renderCity: function renderCity(pIndex, child, index) {
            return React.createElement(City, {
                key: index,
                datasource: child,
                onChange: this.onCityChange.bind(this, pIndex, index)
            });
        },
        render: function render() {
            var props = this.props;
            var datasource = props.datasource;
            return React.createElement('li', { className: cx(props).build() }, React.createElement('div', { className: cx().part('selector').build() }, React.createElement(Selector, {
                label: datasource.text,
                id: datasource.id,
                checked: datasource.selected,
                onChange: this.onSelectorChange
            })), React.createElement('div', { className: cx().part('content').build() }, _.map(datasource.children, this.renderProvince, this)));
        }
    });
    RegionArea.propTypes = {
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        datasource: PropTypes.object
    };
    module.exports = RegionArea;
});
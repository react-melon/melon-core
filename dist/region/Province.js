define('melon-core/region/Province', [
    'require',
    'exports',
    'module',
    'react',
    'melon-classname',
    './Selector',
    './helper'
], function (require, exports, module) {
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('RegionProvince');
    var Selector = require('./Selector');
    var helper = require('./helper');
    var PropTypes = React.PropTypes;
    var RegionProvince = React.createClass({
        displayName: 'RegionProvince',
        getInitialState: function getInitialState() {
            return { expand: false };
        },
        onSelectorChange: function onSelectorChange(e) {
            var value = e.value;
            var datasource = this.props.datasource;
            helper[value ? 'selectAll' : 'cancelAll'](datasource);
            var onChange = this.props.onChange;
            onChange && onChange({ data: datasource });
        },
        onMouseEnter: function onMouseEnter(e) {
            this.setState({ expand: true });
        },
        onMouseLeave: function onMouseLeave(e) {
            this.setState({ expand: false });
        },
        renderSelectedInfo: function renderSelectedInfo() {
            var datasource = this.props.datasource;
            var total = datasource.children && datasource.children.length;
            if (!total) {
                return;
            }
            var num = datasource.children.reduce(function (result, child, index) {
                if (child.selected) {
                    result++;
                }
                return result;
            }, 0);
            return num === total || num === 0 ? null : React.createElement('span', { className: cx().part('info').build() }, '(' + num + '/' + total + ')');
        },
        render: function render() {
            var _props = this.props;
            var datasource = _props.datasource;
            var children = _props.children;
            return React.createElement('div', {
                className: cx(this.props).addStates({ expand: this.state.expand }).build(),
                onMouseEnter: children ? this.onMouseEnter : null,
                onMouseLeave: children ? this.onMouseLeave : null
            }, React.createElement(Selector, {
                label: datasource.text,
                id: datasource.id,
                checked: datasource.selected,
                onChange: this.onSelectorChange
            }), this.renderSelectedInfo(), children ? React.createElement('div', { className: cx().part('popup').build() }, React.createElement('ul', null, children)) : null);
        }
    });
    RegionProvince.propTypes = {
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        datasource: PropTypes.object
    };
    module.exports = RegionProvince;
});
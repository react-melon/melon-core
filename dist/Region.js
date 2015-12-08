define('melon-core/Region', [
    'require',
    'exports',
    'module',
    'react',
    'melon-classname',
    './region/Selector',
    './region/Area',
    './region/helper',
    'underscore',
    './createInputComponent'
], function (require, exports, module) {
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('Region');
    var Selector = require('./region/Selector');
    var Area = require('./region/Area');
    var helper = require('./region/helper');
    var _ = require('underscore');
    var Region = React.createClass({
        displayName: 'Region',
        getInitialState: function getInitialState() {
            return { datasource: this.props.datasource };
        },
        onChange: function onChange(rawValue) {
            var onChange = this.props.onChange;
            onChange({
                type: 'change',
                target: this,
                value: this.stringifyValue(rawValue)
            });
        },
        onAreaChange: function onAreaChange(index, cIndex, e) {
            var data = e.data;
            var datasource = this.state.datasource;
            helper.isAllSelected(data);
            datasource[cIndex].children[index] = data;
            helper.isAllSelected(datasource[cIndex]);
            this.setState({ datasource: datasource }, function () {
                this.onChange(datasource);
            });
        },
        onSelectorChange: function onSelectorChange(index, e) {
            var value = e.value;
            var datasource = this.state.datasource;
            helper[value ? 'selectAll' : 'cancelAll'](datasource[index]);
            this.setState({ datasource: datasource }, function () {
                this.onChange(datasource);
            });
        },
        parseValue: function parseValue(value) {
            value = value.split(',');
            return _.map(this.props.datasource, helper.parse.bind(this, value));
        },
        stringifyValue: function stringifyValue(datasource) {
            return datasource ? _.reduce(datasource, this.format, [], this).join(',') : '';
        },
        format: function format(result, child, index) {
            if (child.selected) {
                result.push(child.id);
            }
            return _.reduce(child.children, this.format, result, this);
        },
        renderCountry: function renderCountry(country, index) {
            return React.createElement('div', {
                className: cx().part('country').build(),
                key: index
            }, React.createElement('h1', null, React.createElement(Selector, {
                label: country.text,
                id: country.id,
                index: index,
                checked: country.selected,
                onChange: this.onSelectorChange.bind(this, index)
            })), this.renderArea(country.children, index));
        },
        renderArea: function renderArea(area, cIndex) {
            return _.isArray(area) && area.length > 0 ? React.createElement('ul', null, area.map(function (a, index) {
                return React.createElement(Area, {
                    key: index,
                    variants: index % 2 ? ['even'] : [],
                    datasource: a,
                    onChange: this.onAreaChange.bind(this, index, cIndex)
                });
            }, this)) : null;
        },
        render: function render() {
            var datasource = this.state.datasource;
            return React.createElement('div', { className: cx(this.props).build() }, datasource.map(this.renderCountry, this));
        }
    });
    Region.defaultProps = {
        defaultValue: '',
        datasource: [],
        validateEvents: ['change']
    };
    var PropTypes = React.PropTypes;
    Region.propTypes = {
        onChange: PropTypes.func,
        readOnly: PropTypes.bool,
        disabled: PropTypes.bool,
        selected: PropTypes.bool,
        name: PropTypes.string,
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        datasource: PropTypes.arrayOf(PropTypes.object)
    };
    module.exports = require('./createInputComponent').create(Region);
});
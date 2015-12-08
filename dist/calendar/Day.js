define('melon-core/calendar/Day', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'melon-classname',
    '../common/util/date',
    './ItemMixin'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('CalendarDay');
    var DateTime = require('../common/util/date');
    var ItemMixin = require('./ItemMixin');
    var PropTypes = React.PropTypes;
    var CalendarDay = React.createClass({
        displayName: 'CalendarDay',
        mixins: [ItemMixin],
        render: function render() {
            var _props = this.props;
            var date = _props.date;
            var selected = _props.selected;
            var others = babelHelpers.objectWithoutProperties(_props, [
                'date',
                'selected'
            ]);
            var className = cx(this.props).addVariants(DateTime.isEqualDate(date, new Date()) ? 'today' : null).addStates({ selected: selected }).build();
            return React.createElement('a', babelHelpers.extends({}, others, {
                className: className,
                href: '#',
                onClick: this.onClick
            }), date.getDate());
        }
    });
    CalendarDay.propTypes = {
        date: PropTypes.object.isRequired,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        selected: PropTypes.bool
    };
    module.exports = CalendarDay;
});
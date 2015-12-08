define('melon-core/Mask', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('Mask');
    var PropTypes = React.PropTypes;
    var Mask = React.createClass({
        displayName: 'Mask',
        getInitialState: function getInitialState() {
            this.originalBodyOverflow = '';
            return {};
        },
        propTypes: {
            autoLockScrolling: PropTypes.bool,
            show: PropTypes.bool
        },
        getDefaultProps: function getDefaultProps() {
            return { autoLockScrolling: true };
        },
        componentDidMount: function componentDidMount() {
            this.originalBodyOverflow = document.getElementsByTagName('body')[0].style.oveflow;
        },
        componentDidUpdate: function componentDidUpdate() {
            var _props = this.props;
            var autoLockScrolling = _props.autoLockScrolling;
            var show = _props.show;
            if (!autoLockScrolling) {
                return;
            }
            show ? this.preventScrolling() : this.allowScrolling();
        },
        componentWillUnmount: function componentWillUnmount() {
            this.allowScrolling();
        },
        preventScrolling: function preventScrolling() {
            var body = document.getElementsByTagName('body')[0];
            body.style.overflow = 'hidden';
        },
        allowScrolling: function allowScrolling() {
            var body = document.getElementsByTagName('body')[0];
            body.style.overflow = this.originalBodyOverflow || '';
        },
        render: function render() {
            var props = this.props;
            var show = props.show;
            return React.createElement('div', babelHelpers.extends({}, props, { className: cx(props).addStates({ show: show }).build() }));
        }
    });
    module.exports = Mask;
});
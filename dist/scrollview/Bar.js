define('melon-core/scrollview/Bar', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'melon-classname',
    '../common/util/dom',
    'underscore'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('ScrollviewBar');
    var dom = require('../common/util/dom');
    var _ = require('underscore');
    var ScrollViewBar = React.createClass({
        displayName: 'ScrollViewBar',
        getInitialState: function getInitialState() {
            this.removeStateShow = _.throttle.call(this, this.removeStateShow, 100);
            return {};
        },
        componentDidMount: function componentDidMount() {
            this.positionThumb();
        },
        shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
            if (Math.abs(nextProps.position - this.props.position) < 0.0005) {
                return false;
            }
            dom.addClass(this.refs.main, 'state-show');
            this.removeStateShow();
            return true;
        },
        componentDidUpdate: function componentDidUpdate() {
            this.positionThumb();
        },
        componentWillUnmount: function componentWillUnmount() {
            this.clearTimer();
        },
        positionThumb: function positionThumb() {
            var _refs = this.refs;
            var main = _refs.main;
            var thumb = _refs.thumb;
            var _props = this.props;
            var direction = _props.direction;
            var position = _props.position;
            var thumbSize = _props.thumbSize;
            var isVertical = direction === 'vertical';
            var axis = isVertical ? 'top' : 'left';
            this.barSize = main[isVertical ? 'offsetHeight' : 'offsetWidth'] - thumbSize - 4;
            thumb.style[isVertical ? 'height' : 'width'] = thumbSize + 'px';
            thumb.style[axis] = Math.round(position * this.barSize) + 'px';
        },
        getMousePosition: function getMousePosition(e, isVertical) {
            if (isVertical) {
                return e.pageY || e.clientY;
            }
            return e.pageX || e.clientX;
        },
        clearTimer: function clearTimer() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
        },
        removeStateShow: function removeStateShow() {
            this.clearTimer();
            var main = this.refs.main;
            this.timer = setTimeout(function () {
                dom.removeClass(main, 'state-show');
            }, 1800);
        },
        onBarMouseDown: function onBarMouseDown(e) {
            var target = e.target;
            if (target === this.refs.thumb) {
                return;
            }
            var _props2 = this.props;
            var direction = _props2.direction;
            var thumbSize = _props2.thumbSize;
            var main = this.refs.main;
            var me = this;
            var isVertical = direction === 'vertical';
            var axis = isVertical ? 'top' : 'left';
            var barSize = main[isVertical ? 'offsetHeight' : 'offsetWidth'] - thumbSize - 4;
            var mousePos = this.getMousePosition(e, isVertical) - dom.getPosition(main)[axis];
            var pos = mousePos - thumbSize / 2;
            pos = pos > barSize ? barSize : pos;
            pos = pos < 0 ? 0 : pos;
            me.fireAction('change', pos / barSize);
            e.preventDefault();
        },
        onMouseDown: function onMouseDown(e) {
            var body = document.body;
            dom.addClass(body, 'ui-noselect');
            var isVertical = this.props.direction === 'vertical';
            var axis = isVertical ? 'top' : 'left';
            this.thumbStart = parseInt(this.refs.thumb.style[axis], 10) || 0;
            this.moveStart = this.getMousePosition(e, isVertical);
            dom.on(body, 'mousemove', this.onMouseMove);
            dom.on(body, 'mouseup', this.onMouseUp);
            e.preventDefault();
        },
        onMouseMove: function onMouseMove(e) {
            e = e || window.event;
            var isVertical = this.props.direction === 'vertical';
            var moveLength = this.getMousePosition(e, isVertical);
            moveLength -= this.moveStart;
            var pos = Math.min(this.barSize, Math.max(0, this.thumbStart + moveLength));
            this.fireAction('change', pos / this.barSize);
        },
        onMouseUp: function onMouseUp(e) {
            var body = document.body;
            dom.removeClass(body, 'ui-noselect');
            dom.off(body, 'mousemove', this.onMouseMove);
            dom.off(body, 'mouseup', this.onMouseUp);
            this.thumbStart = this.moveStart = 0;
        },
        fireAction: function fireAction(action, pos) {
            var e = {
                action: action,
                position: pos,
                target: this
            };
            var onAction = this.props.onAction;
            onAction && onAction(e);
        },
        render: function render() {
            return React.createElement('div', babelHelpers.extends({}, this.props, {
                ref: 'main',
                className: cx(this.props).addVariants(this.props.direction).build(),
                onMouseDown: this.onBarMouseDown
            }), React.createElement('div', {
                ref: 'thumb',
                className: cx().part('thumb').build(),
                onMouseDown: this.onMouseDown
            }));
        }
    });
    var PropTypes = React.PropTypes;
    ScrollViewBar.propTypes = {
        direction: PropTypes.oneOf([
            'vertical',
            'horizontal'
        ]).isRequired,
        position: PropTypes.number.isRequired,
        thumbSize: PropTypes.number,
        show: PropTypes.bool,
        onAction: PropTypes.func
    };
    module.exports = ScrollViewBar;
});
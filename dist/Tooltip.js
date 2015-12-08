define('melon-core/Tooltip', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'react-dom',
    './common/util/dom',
    'melon-classname'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var ReactDOM = require('react-dom');
    var dom = require('./common/util/dom');
    var cx = require('melon-classname').create('Tooltip');
    var Tooltip = React.createClass({
        displayName: 'Tooltip',
        getInitialState: function getInitialState() {
            return { isShown: false };
        },
        componentDidMount: function componentDidMount() {
            var popup = this.popup = Tooltip.createPopup();
            this.renderPopup(popup, this.props.content);
        },
        componentWillUnmount: function componentWillUnmount() {
            Tooltip.destroyPopup(this.popup);
            this.popup = null;
        },
        componentDidUpdate: function componentDidUpdate() {
            this.renderPopup(this.popup, this.props.content);
        },
        onClick: function onClick(e) {
            this.toggle();
        },
        onMouseEnter: function onMouseEnter(e) {
            this.show();
        },
        onMouseLeave: function onMouseLeave(e) {
            this.hide();
        },
        isShown: function isShown() {
            return this.state.isShown;
        },
        toggle: function toggle() {
            this.isShown() ? this.hide() : this.show();
        },
        show: function show() {
            this.setState({ isShown: true });
        },
        hide: function hide() {
            this.setState({ isShown: false });
        },
        getPosition: function getPosition() {
            var main = this.main;
            if (!this.isShown() || !main) {
                return {
                    left: -10000,
                    top: 0,
                    opacity: 0,
                    width: 'auto',
                    height: 'auto'
                };
            }
            var props = this.props;
            var direction = props.direction;
            var offsetX = props.offsetX;
            var offsetY = props.offsetY;
            var popup = this.popup.childNodes[0];
            var position = dom.getPosition(main);
            var offsetWidth = popup.offsetWidth;
            var offsetHeight = popup.offsetHeight;
            var styles = { opacity: 1 };
            switch (direction) {
            case 'top':
                styles.left = position.left + (position.width - offsetWidth) / 2;
                styles.top = position.top - offsetHeight - offsetY;
                break;
            case 'bottom':
                styles.left = (position.width - offsetWidth) / 2 + position.left;
                styles.top = position.top + position.height + offsetY;
                break;
            case 'left':
                styles.top = (position.height - offsetHeight) / 2 + position.top;
                styles.left = position.left - offsetWidth - offsetY;
                break;
            case 'right':
                styles.top = (position.height - offsetHeight) / 2 + position.top;
                styles.left = position.left + position.width + offsetX;
                break;
            }
            return styles;
        },
        renderPopup: function renderPopup(target, content) {
            ReactDOM.render(React.createElement('div', {
                className: cx().part('popup').build(),
                style: this.getPosition()
            }, content), target);
        },
        render: function render() {
            var _this = this;
            var props = this.props;
            var mode = props.mode;
            var children = props.children;
            var direction = props.direction;
            var onClick = mode === 'click' ? this.onClick : null;
            var onMouseEnter = mode === 'over' ? this.onMouseEnter : null;
            var onMouseLeave = mode === 'over' ? this.onMouseLeave : null;
            return React.createElement('div', babelHelpers.extends({}, props, {
                ref: function ref(main) {
                    if (main) {
                        _this.main = main;
                    }
                },
                className: cx(props).addStates({ direction: direction }).build(),
                onClick: onClick,
                onMouseEnter: onMouseEnter,
                onMouseLeave: onMouseLeave
            }), children);
        }
    });
    var PropTypes = React.PropTypes;
    Tooltip.propTypes = {
        arrow: PropTypes.bool.isRequired,
        direction: PropTypes.oneOf([
            'top',
            'bottom',
            'left',
            'right'
        ]).isRequired,
        mode: PropTypes.oneOf([
            'over',
            'click'
        ])
    };
    Tooltip.defaultProps = {
        arrow: true,
        direction: 'bottom',
        mode: 'over',
        offsetX: 14,
        offsetY: 14
    };
    var container;
    Tooltip.createPopup = function () {
        if (!container) {
            container = document.createElement('div');
            container.className = cx().part('container').build();
            document.body.appendChild(container);
        }
        var popup = document.createElement('div');
        container.appendChild(popup);
        return popup;
    };
    Tooltip.destroyPopup = function (popup) {
        container.removeChild(popup);
    };
    module.exports = Tooltip;
});
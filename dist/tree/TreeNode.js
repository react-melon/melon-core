define('melon-core/tree/TreeNode', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'melon-classname',
    '../Icon'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('TreeNode');
    var Icon = require('../Icon');
    var PropTypes = React.PropTypes;
    var TreeNode = React.createClass({
        displayName: 'TreeNode',
        propTypes: {
            label: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element
            ]),
            expandIcon: PropTypes.string,
            unexpandIcon: PropTypes.string,
            expand: PropTypes.bool,
            selected: PropTypes.bool,
            level: PropTypes.number
        },
        getDefaultProps: function getDefaultProps() {
            return {
                label: '',
                expand: false,
                selected: false
            };
        },
        getInitialState: function getInitialState() {
            var props = this.props;
            return { expand: props.expand || false };
        },
        shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
            return nextState.expand !== this.state.expand;
        },
        componentWillReceiveProps: function componentWillReceiveProps(props) {
            if (props.expand === this.props.expand) {
                return;
            }
            this.setState({ expand: props.expand });
        },
        handleOnClick: function handleOnClick(e) {
            var state = this.state;
            var expand = state.expand;
            this.setState({ expand: !expand });
        },
        render: function render() {
            var props = this.props;
            var label = props.label;
            var others = babelHelpers.objectWithoutProperties(props, ['label']);
            var expand = this.state.expand;
            var icon = expand ? props.expandIcon || TreeNode.ICON[1] : props.unexpandIcon || TreeNode.ICON[0];
            var children = props.children;
            var iconStyle;
            var labelStyle;
            if (props.level) {
                var level = props.level - 0;
                labelStyle = { paddingLeft: level * 1.2 + 0.4 + 'em' };
                iconStyle = { left: 0.25 + (level - 1) * 1.2 + 'em' };
            }
            if (React.Children.count(children) > 0) {
                children = [
                    React.createElement(Icon, {
                        key: 'icon',
                        icon: icon,
                        onClick: this.handleOnClick,
                        style: iconStyle
                    }),
                    React.createElement('span', {
                        onClick: this.handleOnClick,
                        key: 'label',
                        'data-role': 'tree-node-label',
                        style: labelStyle,
                        className: cx().part('label').addVariants('parent').addStates({ expand: expand }).build()
                    }, label),
                    React.createElement('ul', {
                        className: cx().part('root').addStates({ expand: expand }).build(),
                        key: 'root',
                        ref: 'list'
                    }, children)
                ];
            } else {
                children = React.createElement('span', {
                    onClick: this.handleOnClick,
                    key: 'label',
                    'data-role': 'tree-node-label',
                    style: labelStyle,
                    className: cx().part('label').build()
                }, label);
            }
            return React.createElement('li', babelHelpers.extends({}, others, {
                'data-role': 'tree-node',
                className: cx(props).addVariants('level' + props.level).build()
            }), children);
        }
    });
    TreeNode.ICON = [
        'chevron-right',
        'expand-more'
    ];
    module.exports = TreeNode;
});
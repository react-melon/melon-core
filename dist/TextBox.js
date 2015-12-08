define('melon-core/TextBox', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'react-dom',
    './textbox/Input',
    './Validity',
    'melon-classname',
    './createInputComponent'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var ReactDOM = require('react-dom');
    var TextBoxInput = require('./textbox/Input');
    var Validity = require('./Validity');
    var cx = require('melon-classname').create('TextBox');
    var TextBox = React.createClass({
        displayName: 'TextBox',
        getInitialState: function getInitialState() {
            var value = this.props.value;
            return { isFocus: false };
        },
        onFocus: function onFocus(e) {
            var _props = this.props;
            var onFocus = _props.onFocus;
            var validate = _props.validate;
            var value = _props.value;
            if (onFocus) {
                onFocus({
                    type: 'focus',
                    target: this
                });
            }
            this.setState({ isFocus: true });
            if (this.needValidate('focus')) {
                validate(value);
            }
        },
        onBlur: function onBlur(e) {
            var _props2 = this.props;
            var onBlur = _props2.onBlur;
            var value = _props2.value;
            var validate = _props2.validate;
            if (onBlur) {
                onBlur({
                    type: 'blur',
                    target: this
                });
            }
            this.setState({ isFocus: false });
            if (this.needValidate('blur')) {
                validate(value);
            }
        },
        onChange: function onChange(e) {
            var value = e.target.value;
            var _props3 = this.props;
            var onChange = _props3.onChange;
            var validate = _props3.validate;
            onChange({
                type: 'change',
                target: this,
                value: value
            });
            if (this.needValidate('change')) {
                validate(value);
            }
        },
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            var value = nextProps.value;
            if (nextProps.multiline && this.props.value !== value) {
                this.syncTextareaHeight();
            }
        },
        syncTextareaHeight: function syncTextareaHeight() {
            var input = this.input;
            if (input) {
                input.style.height = 'auto';
                input.style.height = input.scrollHeight + 'px';
            }
        },
        needValidate: function needValidate(eventName) {
            return this.props.validateEvents.indexOf(eventName) !== -1;
        },
        render: function render() {
            var _this = this;
            var onFocus = this.onFocus;
            var onBlur = this.onBlur;
            var onChange = this.onChange;
            var props = this.props;
            var className = props.className;
            var value = props.value;
            var validity = props.validity;
            var rest = babelHelpers.objectWithoutProperties(props, [
                'className',
                'value',
                'validity'
            ]);
            var isFocus = this.state.isFocus;
            var statefulClassName = cx(props).addStates({
                focus: isFocus,
                fulfilled: !!value
            }).build();
            return React.createElement('div', { className: statefulClassName }, React.createElement(TextBoxInput, babelHelpers.extends({}, rest, {
                onFocus: onFocus,
                onBlur: onBlur,
                onChange: onChange,
                isFocus: isFocus,
                value: value,
                ref: function ref(input) {
                    if (input) {
                        _this.input = ReactDOM.findDOMNode(input);
                    }
                }
            })), React.createElement(Validity, { validity: validity }));
        }
    });
    TextBox.defaultProps = {
        value: '',
        defaultValue: '',
        validateEvents: [
            'change',
            'blur'
        ]
    };
    var PropTypes = React.PropTypes;
    TextBox.propTypes = {
        type: PropTypes.oneOf([
            'text',
            'password'
        ]),
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        placeholder: PropTypes.string,
        multiline: PropTypes.bool,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func
    };
    module.exports = require('./createInputComponent').create(TextBox);
});
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', './util/shallowEqual', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('./util/shallowEqual'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.shallowEqual, global.babelHelpers);
        global.InputComponent = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    var InputComponent = function (_Component) {
        babelHelpers.inherits(InputComponent, _Component);

        function InputComponent(props) {
            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            babelHelpers.classCallCheck(this, InputComponent);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props, context));

            var value = props.value,
                defaultValue = props.defaultValue;

            _this.state = {
                value: value === void 0 ? defaultValue : value
            };
            return _this;
        }

        /**
         * 这里主要做一件事，就是注册到 form 上，让 form 在 getData() / validate() 时避免递归遍历
         */


        InputComponent.prototype.componentDidMount = function componentDidMount() {
            var attachForm = this.context.attachForm;
            if (attachForm) {
                attachForm(this);
            }
        };

        InputComponent.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
            return !(0, _shallowEqual2['default'])(this.state, nextState) || !(0, _shallowEqual2['default'])(this.props, nextProps);
        };

        InputComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            var value = nextProps.value;

            if (nextProps.hasOwnProperty('value') && this.state.value !== value) {
                this.setState({ value: value });
            }
        };

        InputComponent.prototype.componentWillUnmount = function componentWillUnmount() {

            var detachForm = this.context.detachForm;

            if (detachForm) {
                detachForm(this);
            }
        };

        InputComponent.prototype.onChange = function onChange(e, callback) {
            var _props = this.props,
                onChange = _props.onChange,
                value = _props.value;


            onChange && onChange(e);

            // 在 React 中，只要 props 中的 value 是 undefined
            // 那么 input 就会进入 uncontrolled 模式
            // 这种对应着 controlled 组件逻辑，
            // 在 controlled 模式下，我们就不需要将 value 同步到 state 中；
            // 这个同步的过程是在 componentWillReceiveProps 中处理的；
            if (value !== void 0) {
                callback && callback();
                return;
            }

            // 这种对应 uncontrolled 逻辑
            if (e.value !== this.state.value) {
                this.setState({ value: e.value }, callback);
            }
        };

        InputComponent.prototype.isDisabled = function isDisabled() {
            return this.props.disabled;
        };

        InputComponent.prototype.isReadOnly = function isReadOnly() {
            return this.props.readOnly;
        };

        InputComponent.prototype.getValue = function getValue() {
            return this.state.value;
        };

        InputComponent.prototype.getStyleStates = function getStyleStates() {
            var _props2 = this.props,
                readOnly = _props2.readOnly,
                valid = _props2.valid,
                disabled = _props2.disabled;


            var states = {};

            if (readOnly !== void 0) {
                states['read-only'] = readOnly;
            }

            if (disabled !== void 0) {
                states.disabled = disabled;
            }

            if (valid !== void 0) {
                states.valid = !!valid;
                states.invalid = !valid;
            }

            return states;
        };

        return InputComponent;
    }(_react.Component);

    exports['default'] = InputComponent;


    InputComponent.displayName = 'InputComponent';

    InputComponent.propTypes = {
        name: _propTypes2['default'].string,
        readOnly: _propTypes2['default'].bool,
        valid: _propTypes2['default'].bool,
        onChange: _propTypes2['default'].func,
        value: function value(props, propName, componentName) {
            if (props.hasOwnProperty(propName) && !props.hasOwnProperty('onChange') && !props.readOnly) {
                return new Error('Failed form propType: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`. Check the render method of `' + componentName + '`.');
            }
        },
        defaultValue: function defaultValue(props, propName, componentName) {
            if (props.hasOwnProperty(propName) && props.hasOwnProperty('value')) {

                return new Error(componentName + ' with both value and defaultValue props.InputComponent must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both).');
            }
        }
    };

    InputComponent.defaultProps = {};

    InputComponent.contextTypes = {
        attachForm: _propTypes2['default'].func,
        detachForm: _propTypes2['default'].func
    };
});
//# sourceMappingURL=InputComponent.js.map

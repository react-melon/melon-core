(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './util/shallowEqual', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./util/shallowEqual'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.shallowEqual, global.babelHelpers);
        global.InputComponent = mod.exports;
    }
})(this, function (exports, _react, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;

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

        InputComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            var value = nextProps.value,
                defaultValue = nextProps.defaultValue;


            if (value === void 0) {
                value = defaultValue;
            }

            if (value !== this.state.value) {
                this.setState({ value: value });
            }
        };

        InputComponent.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
            return !(0, _shallowEqual2['default'])(this.props, nextProps) || !(0, _shallowEqual2['default'])(this.state, nextState);
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


            // 在 React 中，只要 props 中的 value 是 undefined
            // 那么 input 就会进入 uncontrolled 模式
            // 这种对应着 controlled 组件逻辑，controlled 模式我们就啥也不管啦
            if (value !== void 0) {
                onChange && onChange(e);
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
        name: _react.PropTypes.string,
        readOnly: _react.PropTypes.bool,
        valid: _react.PropTypes.bool,
        onChange: _react.PropTypes.func
    };

    InputComponent.defaultProps = {};

    InputComponent.contextTypes = {
        attachForm: _react.PropTypes.func,
        detachForm: _react.PropTypes.func
    };
});
//# sourceMappingURL=InputComponent.js.map

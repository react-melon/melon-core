(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', './util/shallowEqual'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('./util/shallowEqual'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.shallowEqual);
        global.InputComponent = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _shallowEqual) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _propTypes2 = _interopRequireDefault(_propTypes);

    var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var InputComponent = function (_Component) {
        _inherits(InputComponent, _Component);

        function InputComponent(props) {
            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            _classCallCheck(this, InputComponent);

            var _this = _possibleConstructorReturn(this, (InputComponent.__proto__ || Object.getPrototypeOf(InputComponent)).call(this, props, context));

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


        _createClass(InputComponent, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var attachForm = this.context.attachForm;
                if (attachForm) {
                    attachForm(this);
                }
            }
        }, {
            key: 'shouldComponentUpdate',
            value: function shouldComponentUpdate(nextProps, nextState) {
                return !(0, _shallowEqual2.default)(this.state, nextState) || !(0, _shallowEqual2.default)(this.props, nextProps);
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {

                var value = nextProps.value;

                if (nextProps.hasOwnProperty('value') && this.state.value !== value) {
                    this.setState({ value: value });
                }
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {

                var detachForm = this.context.detachForm;

                if (detachForm) {
                    detachForm(this);
                }
            }
        }, {
            key: 'onChange',
            value: function onChange(e, callback) {
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
            }
        }, {
            key: 'isDisabled',
            value: function isDisabled() {
                return this.props.disabled;
            }
        }, {
            key: 'isReadOnly',
            value: function isReadOnly() {
                return this.props.readOnly;
            }
        }, {
            key: 'getValue',
            value: function getValue() {
                return this.state.value;
            }
        }, {
            key: 'getStyleStates',
            value: function getStyleStates() {
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
            }
        }]);

        return InputComponent;
    }(_react.Component);

    exports.default = InputComponent;


    InputComponent.displayName = 'InputComponent';

    InputComponent.propTypes = {
        name: _propTypes2.default.string,
        readOnly: _propTypes2.default.bool,
        valid: _propTypes2.default.bool,
        onChange: _propTypes2.default.func,
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
        attachForm: _propTypes2.default.func,
        detachForm: _propTypes2.default.func
    };
});
//# sourceMappingURL=InputComponent.js.map

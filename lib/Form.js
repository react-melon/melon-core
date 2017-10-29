(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', './Validator'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('./Validator'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.Validator);
        global.Form = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _Validator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    var _Validator2 = _interopRequireDefault(_Validator);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _objectWithoutProperties(obj, keys) {
        var target = {};

        for (var i in obj) {
            if (keys.indexOf(i) >= 0) continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
            target[i] = obj[i];
        }

        return target;
    }

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
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

    var Form = function (_PureComponent) {
        _inherits(Form, _PureComponent);

        function Form(props) {
            _classCallCheck(this, Form);

            var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

            _this.fields = [];
            _this.state = {};

            _this.addField = _this.addField.bind(_this);
            _this.removeField = _this.removeField.bind(_this);

            return _this;
        }

        _createClass(Form, [{
            key: 'getChildContext',
            value: function getChildContext() {
                return {
                    pointer: '/',
                    attachForm: this.addField,
                    detachForm: this.removeField,
                    validator: this.props.validator
                };
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.fields.length = 0;
                this.fields = null;
            }
        }, {
            key: 'addField',
            value: function addField(field) {
                this.fields.push(field);
            }
        }, {
            key: 'removeField',
            value: function removeField(field) {

                var fields = this.fields;

                if (fields) {
                    this.fields = this.fields.filter(function (f) {
                        return f !== field;
                    });
                }
            }
        }, {
            key: 'isValidFormField',
            value: function isValidFormField(field) {
                var value = field.getValue();
                var _field$props = field.props,
                    name = _field$props.name,
                    disabled = _field$props.disabled;

                return name && !disabled && value != null;
            }
        }, {
            key: 'getData',
            value: function getData() {
                var _this2 = this;

                return this.fields.reduce(function (data, field) {

                    if (_this2.isValidFormField(field)) {
                        data[field.props.name] = field.getValue();
                    }

                    return data;
                }, {});
            }
        }, {
            key: 'validate',
            value: function validate() {
                return this.checkValidity().isValid;
            }
        }, {
            key: 'checkValidity',
            value: function checkValidity() {
                var _this3 = this;

                var validator = this.props.validator;

                return this.fields.reduce(function (formValidity, field) {

                    // 不校验以下字段
                    if (!_this3.isValidFormField(field)) {
                        return formValidity;
                    }

                    var value = field.getValue();
                    var validity = validator.validate(value, field);

                    return {
                        isValid: formValidity.isValid && validity.isValid(),
                        errors: [].concat(_toConsumableArray(formValidity.errors), _toConsumableArray(validity.states.filter(function (state) {
                            return !state.isValid;
                        })))
                    };
                }, {
                    isValid: true,
                    errors: []
                });
            }
        }, {
            key: 'render',
            value: function render() {
                var _this4 = this;

                var _props = this.props,
                    noValidate = _props.noValidate,
                    _onSubmit = _props.onSubmit,
                    validator = _props.validator,
                    rest = _objectWithoutProperties(_props, ['noValidate', 'onSubmit', 'validator']);

                return _react2.default.createElement('form', _extends({}, rest, { onSubmit: function onSubmit(e) {

                        if (!noValidate) {
                            if (!_this4.validate()) {
                                e.preventDefault();
                                return;
                            }
                        }

                        if (_onSubmit) {
                            e.data = _this4.getData();
                            _onSubmit(e);
                        }
                    } }));
            }
        }]);

        return Form;
    }(_react.PureComponent);

    exports.default = Form;


    Form.displayName = 'Form';

    Form.propTypes = {
        onSumbit: _propTypes2.default.func,
        target: _propTypes2.default.string,
        action: _propTypes2.default.string,
        method: _propTypes2.default.oneOf(['POST', 'GET']),
        validator: _propTypes2.default.shape({
            validate: _propTypes2.default.func.isRequired
        })
    };

    Form.defaultProps = {
        validator: _Validator2.default
    };

    Form.childContextTypes = {
        attachForm: _propTypes2.default.func,
        detachForm: _propTypes2.default.func,
        validator: _propTypes2.default.shape({
            validate: _propTypes2.default.func.isRequired
        }),
        pointer: _propTypes2.default.string.isRequired
    };
});
//# sourceMappingURL=Form.js.map

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './validator/Validity'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./validator/Validity'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Validity);
        global.Validator = mod.exports;
    }
})(this, function (exports, _Validity) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Validator = undefined;

    var _Validity2 = _interopRequireDefault(_Validity);

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

    var Validator = exports.Validator = function () {
        function Validator() {
            _classCallCheck(this, Validator);

            this.rules = [];
        }

        _createClass(Validator, [{
            key: 'addRule',
            value: function addRule(rule) {
                this.rules.push(rule);
                return this;
            }
        }, {
            key: 'resolveCheckers',
            value: function resolveCheckers() {
                var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


                var rules = this.rules;

                return rules.reduce(function (activeCheckers, checker) {
                    var name = checker.name,
                        check = checker.check;


                    if (name in config) {
                        activeCheckers.push({
                            name: name,
                            check: check,
                            value: config[name]
                        });
                    }

                    return activeCheckers;
                }, []);
            }
        }, {
            key: 'validate',
            value: function validate(value, component) {

                return this.resolveCheckers(component.props.rules).reduce(function (validity, checker) {
                    var check = checker.check;
                    var state = check(value, component);
                    validity.addState(state);
                    return validity;
                }, new _Validity2.default());
            }
        }]);

        return Validator;
    }();

    var validator = new Validator();

    exports.default = validator;


    validator.create = function () {
        return new Validator();
    };

    validator.addRule({
        name: 'required',
        check: function check(value, _ref) {
            var props = _ref.props;


            var requiredErrorMessage = props.rules.requiredErrorMessage;

            var isValid = Array.isArray(value) ? !!value.length : typeof value === 'string' ? value !== '' : value != null;

            return {
                isValid: isValid,
                message: requiredErrorMessage || '请填写此字段'
            };
        }
    });
});
//# sourceMappingURL=Validator.js.map

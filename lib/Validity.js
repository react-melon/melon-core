(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', './classname/cxBuilder', './validator/Validity', './util/shallowEqual'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('./classname/cxBuilder'), require('./validator/Validity'), require('./util/shallowEqual'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.cxBuilder, global.Validity, global.shallowEqual);
        global.Validity = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _cxBuilder, _Validity, _shallowEqual) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    var _Validity2 = _interopRequireDefault(_Validity);

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

    var cx = (0, _cxBuilder.create)('Validity');

    var Validity = function (_PureComponent) {
        _inherits(Validity, _PureComponent);

        function Validity() {
            _classCallCheck(this, Validity);

            return _possibleConstructorReturn(this, (Validity.__proto__ || Object.getPrototypeOf(Validity)).apply(this, arguments));
        }

        _createClass(Validity, [{
            key: 'shouldComponentUpdate',
            value: function shouldComponentUpdate(nextProps, nextState) {
                return !(0, _shallowEqual2.default)(this.props, nextProps);
            }
        }, {
            key: 'render',
            value: function render() {
                var validity = this.props.validity;

                var isValid = validity ? validity.isValid() : true;
                var message = validity ? validity.getMessage() : null;

                var statefulClassName = cx(this.props).addStates({
                    valid: isValid,
                    invalid: !isValid
                }).build();

                return _react2.default.createElement(
                    'div',
                    { className: statefulClassName },
                    message
                );
            }
        }]);

        return Validity;
    }(_react.PureComponent);

    exports.default = Validity;


    Validity.displayName = 'Validity';

    Validity.propTypes = {
        validity: _propTypes2.default.instanceOf(_Validity2.default)
    };
});
//# sourceMappingURL=Validity.js.map

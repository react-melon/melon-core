(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './classname/cxBuilder', './validator/Validity', './util/shallowEqual', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./classname/cxBuilder'), require('./validator/Validity'), require('./util/shallowEqual'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Validity, global.shallowEqual, global.babelHelpers);
        global.Validity = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Validity, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    /**
     * @file melon/Validity
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('Validity');

    var Validity = function (_Component) {
        babelHelpers.inherits(Validity, _Component);

        function Validity() {
            babelHelpers.classCallCheck(this, Validity);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        Validity.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
            return !(0, _shallowEqual2['default'])(this.props, nextProps);
        };

        Validity.prototype.render = function render() {
            var validity = this.props.validity;

            var isValid = validity ? validity.isValid() : true;
            var message = validity ? validity.getMessage() : null;

            var statefulClassName = cx(this.props).addStates({
                valid: isValid,
                invalid: !isValid
            }).build();

            return _react2['default'].createElement(
                'div',
                { className: statefulClassName },
                message
            );
        };

        return Validity;
    }(_react.Component);

    exports['default'] = Validity;


    Validity.displayName = 'Validity';

    Validity.propTypes = {
        validity: _react.PropTypes.instanceOf(_Validity2['default'])
    };
});
//# sourceMappingURL=Validity.js.map

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.babelHelpers);
        global.ValidityState = mod.exports;
    }
})(this, function (exports, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var ValidityState = function ValidityState(_ref) {
        var isValid = _ref.isValid,
            message = _ref.message;
        babelHelpers.classCallCheck(this, ValidityState);


        this.isValid = isValid;
        this.message = message || '';
    };

    exports['default'] = ValidityState;
});
//# sourceMappingURL=ValidityState.js.map

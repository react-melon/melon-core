(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.ValidityState = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ValidityState = function ValidityState(_ref) {
        var isValid = _ref.isValid,
            message = _ref.message;

        _classCallCheck(this, ValidityState);

        this.isValid = isValid;
        this.message = message || '';
    };

    exports.default = ValidityState;
});
//# sourceMappingURL=ValidityState.js.map

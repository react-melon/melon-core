/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.babelHelpers);
        global.shallowEqual = mod.exports;
    }
})(this, function (exports, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = shallowEqual;

    /**
     * @file shallowEqual
     * @see https://github.com/dashed/shallowequal/blob/master/src/index.js
     * @author leon <ludafa@outlook.com>
     */

    var hasOwn = Object.prototype.hasOwnProperty;

    function shallowEqual(objA, objB, compare) {
        var compareContext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;


        var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

        if (ret !== void 0) {
            return !!ret;
        }

        if (objA === objB) {
            return true;
        }

        if ((typeof objA === 'undefined' ? 'undefined' : babelHelpers['typeof'](objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : babelHelpers['typeof'](objB)) !== 'object' || objB === null) {
            return false;
        }

        var keysA = Object.keys(objA);
        var keysB = Object.keys(objB);

        var len = keysA.length;

        if (len !== keysB.length) {
            return false;
        }

        // Test for A's keys different from B.

        for (var i = 0; i < len; i++) {

            var key = keysA[i];

            if (!hasOwn.call(objB, key)) {
                return false;
            }

            var valueA = objA[key];
            var valueB = objB[key];

            var _ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

            if (_ret === false || _ret === void 0 && valueA !== valueB) {
                return false;
            }
        }

        return true;
    }
});
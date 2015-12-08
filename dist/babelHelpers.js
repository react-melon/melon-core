define('melon-core/babelHelpers', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    var babelHelpers = {};
    babelHelpers.typeof = function (obj) {
        return obj && typeof Symbol !== 'undefined' && obj.constructor === Symbol ? 'symbol' : typeof obj;
    };
    babelHelpers.extends = Object.assign || function (target) {
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
    babelHelpers.objectWithoutProperties = function (obj, keys) {
        var target = {};
        for (var i in obj) {
            if (keys.indexOf(i) >= 0)
                continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i))
                continue;
            target[i] = obj[i];
        }
        return target;
    };
    babelHelpers.toConsumableArray = function (arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
                arr2[i] = arr[i];
            return arr2;
        } else {
            return Array.from(arr);
        }
    };
    babelHelpers;
    module.exports = babelHelpers;
});
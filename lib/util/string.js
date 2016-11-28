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
        global.string = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    exports.__esModule = true;
    exports.camelize = camelize;
    exports.pascalize = pascalize;
    exports.hyphenate = hyphenate;
    /**
     * @file 字符串相关的小工具
     * @author leon <ludafa@outlook.com>
     */

    /**
     * @file 骆驼化
     * @author leon(ludafa@outlook.com)
     */

    function camelize(source) {

        if (!source) {
            return '';
        }

        return source.replace(/-([a-z])/g, function (match, alpha) {
            return alpha.toUpperCase();
        });
    }

    function pascalize(source) {

        if (!source) {
            return '';
        }

        /* eslint-disable fecs-max-calls-in-template */
        return '' + source.charAt(0).toUpperCase() + camelize(source.slice(1));
        /* eslint-enable fecs-max-calls-in-template */
    }

    /**
     * 把一个XxxXxx格式的字符串转化成xxx-xxx的格式
     *
     * @param  {string} source 源字符串
     * @return {string}
     */
    function hyphenate(source) {
        return source.replace(/[A-Z]/g, function ($0) {
            return '-' + $0;
        }).slice(1).toLowerCase();
    }
});
//# sourceMappingURL=string.js.map

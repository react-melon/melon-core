define('melon-core/common/util/pascalize', [
    'require',
    'exports',
    'module',
    './camelize'
], function (require, exports, module) {
    'use strict';
    var camelize = require('./camelize');
    module.exports = function (source) {
        if (!source) {
            return '';
        }
        return '' + source.charAt(0).toUpperCase() + camelize(source.slice(1));
    };
});
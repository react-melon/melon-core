define('melon-core/common/util/camelize', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    'use strict';
    module.exports = function (source) {
        if (!source) {
            return '';
        }
        return source.replace(/-([a-z])/g, function (match, alpha) {
            return alpha.toUpperCase();
        });
    };
});
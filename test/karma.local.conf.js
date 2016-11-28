/**
 * @file 本地 karma 测试配置
 * @author ludafa <ludafa@outlook.com>
 */

let karmaConfig = require('./karma.conf.js');

module.exports = function (config) {
    config.set(karmaConfig);
};

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
    global.config = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @file melon/config
   * @author leon(ludafa@outlook.com)
   */

  var COMPONENT_SIZES = exports.COMPONENT_SIZES = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];
  var COMPONENT_CLASS_PREFIX = exports.COMPONENT_CLASS_PREFIX = 'ui';
  var COMPONENT_VARIANT_PREFIX = exports.COMPONENT_VARIANT_PREFIX = 'variant';
  var COMPONENT_STATE_PREFIX = exports.COMPONENT_STATE_PREFIX = 'state';
});
//# sourceMappingURL=config.js.map

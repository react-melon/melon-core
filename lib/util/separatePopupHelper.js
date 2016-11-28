(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react-dom', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react-dom'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.reactDom, global.babelHelpers);
        global.separatePopupHelper = mod.exports;
    }
})(this, function (exports, _reactDom, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.createContainer = createContainer;
    exports.destoryContainer = destoryContainer;

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    /**
     * @file separate popup helper
     * @author cxtom (cxtom2008@gmail.com)
     */

    function createContainer(component, className, wrapper) {

        if (!wrapper) {
            wrapper = document.body;
        }

        var container = component.container = document.createElement('div');
        container.className = className;

        wrapper.appendChild(container);

        return container;
    }

    function destoryContainer(_ref) {
        var container = _ref.container;


        if (container) {
            _reactDom2['default'].unmountComponentAtNode(container);
            container.parentElement.removeChild(container);
            container = null;
        }
    }
});
//# sourceMappingURL=separatePopupHelper.js.map

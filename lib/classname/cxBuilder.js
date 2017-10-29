(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './classname', '../util/string', '../config'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./classname'), require('../util/string'), require('../config'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.classname, global.string, global.config);
        global.cxBuilder = mod.exports;
    }
})(this, function (exports, _classname, _string, _config) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.create = create;

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    var _extends = Object.assign || function (target) {
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

    function addPrefix(prefix) {

        return function () {

            return _classname.createClasses.apply(undefined, arguments).map(function (className) {
                return prefix + '-' + className;
            }).join(' ');
        };
    }

    /**
     * import {create} from 'cxBuilder';
     * const builder = create('textbox');
     *
     * builder()
     *   .part('hehe')
     *   .addStates({invalid: true})
     *   .addVariants(1, 2, 3)
     *   .add('some other classname')
     *   .build()
     *
     * builder({states: {invalid: true}, variants: [12321, 12321], size: 'xx'}).build()
     *
     */

    function resolveVariants(props) {
        var _props$variants = props.variants,
            variants = _props$variants === undefined ? [] : _props$variants,
            size = props.size;

        return _config.COMPONENT_SIZES.indexOf(size) > -1 ? variants.concat('size-' + size) : variants;
    }

    function resolveStates(props) {
        var states = props.states,
            hidden = props.hidden,
            disabled = props.disabled;


        return _extends({}, states, {
            hidden: hidden,
            disabled: disabled
        });
    }

    function create(type) {

        var displayName = (0, _string.pascalize)(type);
        var hyphenatedClassName = (0, _string.hyphenate)(displayName);
        var getVariantClassName = addPrefix(_config.COMPONENT_VARIANT_PREFIX);
        var getStateClassName = addPrefix(_config.COMPONENT_STATE_PREFIX);

        function getPartClassName(part) {
            var prefix = _config.COMPONENT_CLASS_PREFIX + '-' + hyphenatedClassName;
            return part ? prefix + '-' + part : prefix;
        }

        function createBuilder(props) {

            var part = '';
            var states = resolveStates(props);
            var variants = resolveVariants(props);

            var builder = {
                addStates: addStates,
                removeStates: removeStates,
                clearStates: clearStates,
                addVariants: addVariants,
                removeVariants: removeVariants,
                clearVariants: clearVariants,
                build: build,
                part: setPart
            };

            function setPart(p) {
                part = p;
                return builder;
            }

            function addStates(newStates) {
                states = _extends({}, states, newStates);
                return builder;
            }

            function removeStates(name) {
                states[name] = false;
                return builder;
            }

            function clearStates() {
                states = {};
                return builder;
            }

            function addVariants() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                variants = [].concat(_toConsumableArray(variants), args);
                return builder;
            }

            function removeVariants(variant) {
                variants = variants.filter(function (term) {
                    return term !== variant;
                });
                return builder;
            }

            function clearVariants() {
                variants = [];
                return builder;
            }

            function build() {
                return (0, _classname.createClassName)(props.className, getPartClassName(part), getVariantClassName(variants), getStateClassName(states));
            }

            return builder;
        }

        function builder() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return createBuilder(props);
        }

        builder.getPartClassName = getPartClassName;

        builder.getDisplayName = function getDisplayName() {
            return displayName;
        };

        return builder;
    }
});
//# sourceMappingURL=cxBuilder.js.map

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
        global.Validity = mod.exports;
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

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var Validity = function () {
        function Validity() {
            _classCallCheck(this, Validity);

            this.states = [];
        }

        _createClass(Validity, [{
            key: 'addState',
            value: function addState(state) {
                this.states.push(state);
            }
        }, {
            key: 'isValid',
            value: function isValid() {
                for (var i = 0, states = this.states, len = states.length; i < len; ++i) {
                    if (!states[i].isValid) {
                        return false;
                    }
                }
                return true;
            }
        }, {
            key: 'getMessage',
            value: function getMessage() {

                for (var states = this.states, i = 0, len = states.length; i < len; ++i) {
                    if (!states[i].isValid) {
                        return states[i].message;
                    }
                }

                return '';
            }
        }]);

        return Validity;
    }();

    exports.default = Validity;
});
//# sourceMappingURL=Validity.js.map

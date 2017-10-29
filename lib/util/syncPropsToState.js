(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.syncPropsToState = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getNextValue = getNextValue;
    exports.getNextValidity = getNextValidity;
    exports.default = getSyncUpdates;
    /**
     * @file 小工具 - 用于做 InputComponent 的 props -> state 的同步
     * @author leon <lupengyu@baidu.com>
     */

    /**
     * 获取需要同步到 state 中的 value
     *
     * @param  {ReactComponent} component 组件
     * @param  {Object}         nextProps 新属性
     * @return {*}
     */
    function getNextValue(component, nextProps) {
        var value = nextProps.value,
            defaultValue = nextProps.defaultValue;

        return value === void 0 ? defaultValue : value;
    }

    /**
     * 获取需要同步到 state 中的 validity
     *
     * @param {ReactComponent} component 组件
     * @param {string} value 新值
     * @param {bool} disabled 是否可用
     * @param {Object} customValidity 新属性
     * @return {module:Validity}
     */
    function getNextValidity(component, _ref) {
        var value = _ref.value,
            disabled = _ref.disabled,
            customValidity = _ref.customValidity;


        // 如果被禁用了，禁用状态是不进行校验的。那么直接返回 null
        if (disabled) {
            return null;
        }

        // 如果值没有发生变化，那么不需要校验，只在值改变时做校验
        if (value === component.state.value) {
            return component.state.validity;
        }

        // 最后，如果有自定义的出错提示，那么直接用它，不再用校验器做校验。
        return customValidity ? component.validator.createCustomValidity(customValidity) : component.checkValidity(value);
    }

    /**
     * 获取需要同步到 state 中的新属性们
     *
     * @param  {ReactComponent} component 组件
     * @param  {Object}         nextProps 新属性
     * @return {Object}
     */
    function getSyncUpdates(component, nextProps) {

        var value = getNextValue(component, nextProps);
        var disabled = nextProps.disabled,
            customValidity = nextProps.customValidity;

        var validity = getNextValidity(component, {
            value: value,
            customValidity: customValidity,
            disabled: disabled
        });

        if (value === component.state.value && validity === component.state.validity) {
            return null;
        }

        return { value: value, validity: validity };
    }
});
//# sourceMappingURL=syncPropsToState.js.map

/**
* Copyright 2016 Baidu Inc. All rights reserved.
*
* @file InputComponent
* @author leon <ludafa@outlook.com>
*/

import {Component, PropTypes} from 'react';
import shallowEqual from './util/shallowEqual';

export default class InputComponent extends Component {

    constructor(props, context = {}) {
        super(props, context);
        const {value, defaultValue} = props;
        this.state = {
            value: value === void 0 ? defaultValue : value
        };
    }

    /**
     * 这里主要做一件事，就是注册到 form 上，让 form 在 getData() / validate() 时避免递归遍历
     */
    componentDidMount() {

        const attachForm = this.context.attachForm;

        if (attachForm) {
            attachForm(this);
        }

    }

    /**
     * 接收属性处理
     *
     * 我们在这里主要是做 value 更新和校验计算
     *
     * ### 值更新
     *
     * 这个事情把实体控件的的 controlled / uncontrolled 处理解放了
     * 实体控件只需要做 render 和 事件处理就好了
     *
     * @param {Object} nextProps 新属性
     */
    componentWillReceiveProps(nextProps) {

        let value = nextProps.value;

        if (
            nextProps.hasOwnProperty('value')
            && this.state.value !== value
        ) {
            this.setState({value});
        }

    }

    /**
     * 是否应当更新组件
     *
     * @param {*} nextProps 下一个属性
     * @param {*} nextState 下一个状态
     * @return {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }

    componentWillUnmount() {

        const detachForm = this.context.detachForm;

        if (detachForm) {
            detachForm(this);
        }

    }

    /**
     * 值变化处理函数
     *
     * @param {Object}  e         值变化事件
     * @param {Function} callback 完成更新后回调
     */
    onChange(e, callback) {

        const {onChange, value} = this.props;

        onChange && onChange(e);

        // 在 React 中，只要 props 中的 value 是 undefined
        // 那么 input 就会进入 uncontrolled 模式
        // 这种对应着 controlled 组件逻辑，
        // 在 controlled 模式下，我们就不需要将 value 同步到 state 中；
        // 这个同步的过程是在 componentWillReceiveProps 中处理的；
        if (value !== void 0) {
            callback && callback();
            return;
        }

        // 这种对应 uncontrolled 逻辑
        if (e.value !== this.state.value) {
            this.setState({value: e.value}, callback);
        }

    }

    isDisabled() {
        return this.props.disabled;
    }

    isReadOnly() {
        return this.props.readOnly;
    }

    getValue() {
        return this.state.value;
    }

    getStyleStates() {

        const {
            readOnly,
            valid,
            disabled
        } = this.props;


        let states = {};

        if (readOnly !== void 0) {
            states['read-only'] = readOnly;
        }

        if (disabled !== void 0) {
            states.disabled = disabled;
        }

        if (valid !== void 0) {
            states.valid = !!valid;
            states.invalid = !valid;
        }

        return states;

    }


}

InputComponent.displayName = 'InputComponent';

InputComponent.propTypes = {
    name: PropTypes.string,
    readOnly: PropTypes.bool,
    valid: PropTypes.bool,
    onChange: PropTypes.func,
    value(props, propName, componentName) {
        if (
            props.hasOwnProperty(propName)
            && !props.hasOwnProperty('onChange')
            && !props.readOnly
        ) {
            return new Error(`\
Failed form propType: You provided a \`value\` prop to a \
form field without an \`onChange\` handler. This will \
render a read-only field. If the field should be mutable \
use \`defaultValue\`. Otherwise, set either \`onChange\` or \
\`readOnly\`. Check the render method of \`${componentName}\`.`);

        }
    },
    defaultValue(props, propName, componentName) {
        if (
            props.hasOwnProperty(propName)
            && props.hasOwnProperty('value')
        ) {

            return new Error(`\
${componentName} with both value and defaultValue props.\
InputComponent must be either controlled or uncontrolled \
(specify either the value prop, or the defaultValue prop, but not both).`);

        }
    }
};

InputComponent.defaultProps = {};

InputComponent.contextTypes = {
    attachForm: PropTypes.func,
    detachForm: PropTypes.func
};

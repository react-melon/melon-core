/**
 * @file Validitor
 * @author leon(ludafa@outlook.com)
 */

import Validity from './validator/Validity';

export class Validator {

    constructor() {
        this.rules = [];
    }

    addRule(rule) {
        this.rules.push(rule);
        return this;
    }

    resolveCheckers(config = {}) {

        const rules = this.rules;

        return rules
            .reduce(
                (activeCheckers, checker) => {

                    const {name, check} = checker;

                    if (name in config) {
                        activeCheckers.push({
                            name,
                            check: check,
                            value: config[name]
                        });
                    }

                    return activeCheckers;

                },
                []
            );

    }

    validate(value, component) {

        return this
            .resolveCheckers(component.props.rules)
            .reduce(
                (validity, checker) => {
                    const check = checker.check;
                    const state = check(value, component);
                    validity.addState(state);
                    return validity;
                },
                new Validity()
            );

    }

    createCustomValidity(customValidity) {
        const validity = new Validity();
        validity.addState({
            isValid: false,
            message: customValidity
        });
        return validity;
    }

}

const validator = new Validator();

export default validator;

validator.create = () => new Validator();

validator.addRule({
    name: 'required',
    check(value, {props}) {

        const requiredErrorMessage = props.rules.requiredErrorMessage;

        const isValid = Array.isArray(value)
            ? !!value.length
            : typeof value === 'string' ? value !== '' : value != null;

        return {
            isValid: isValid,
            message: requiredErrorMessage || '请填写此字段'
        };

    }
});

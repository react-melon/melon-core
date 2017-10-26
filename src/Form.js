/**
 * @file Form
 * @author leon(ludafa@outlook.com)
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import validator from './Validator';

export default class Form extends PureComponent {

    constructor(props) {

        super(props);

        this.fields = [];
        this.state = {};

        this.addField = this.addField.bind(this);
        this.removeField = this.removeField.bind(this);

    }

    getChildContext() {
        return {
            pointer: '/',
            attachForm: this.addField,
            detachForm: this.removeField,
            validator: this.props.validator
        };
    }

    componentWillUnmount() {
        this.fields.length = 0;
        this.fields = null;
    }

    addField(field) {
        this.fields.push(field);
    }

    removeField(field) {

        const fields = this.fields;

        if (fields) {
            this.fields = this.fields.filter(f => f !== field);
        }

    }

    isValidFormField(field) {
        const value = field.getValue();
        const {name, disabled} = field.props;
        return name && !disabled && value != null;
    }

    getData() {
        return this
            .fields
            .reduce(
                (data, field) => {

                    if (this.isValidFormField(field)) {
                        data[field.props.name] = field.getValue();
                    }

                    return data;
                },
                {}
            );
    }

    validate() {
        return this.checkValidity().isValid;
    }

    checkValidity() {

        const validator = this.props.validator;

        return this
            .fields
            .reduce((formValidity, field) => {

                // 不校验以下字段
                if (!this.isValidFormField(field)) {
                    return formValidity;
                }

                const value = field.getValue();
                const validity = validator.validate(value, field);

                return {
                    isValid: formValidity.isValid && validity.isValid(),
                    errors: [
                        ...formValidity.errors,
                        ...validity.states.filter(state => !state.isValid)
                    ]
                };

            }, {
                isValid: true,
                errors: []
            });
    }

    render() {

        const {
            noValidate,
            onSubmit,
            /* eslint-disable no-unused-vars */
            validator,
            /* eslint-enable no-unused-vars */
            ...rest
        } = this.props;

        return (
            <form {...rest} onSubmit={e => {

                if (!noValidate) {
                    if (!this.validate()) {
                        e.preventDefault();
                        return;
                    }
                }

                if (onSubmit) {
                    e.data = this.getData();
                    onSubmit(e);
                }


            }} />
        );

    }

}

Form.displayName = 'Form';

Form.propTypes = {
    onSumbit: PropTypes.func,
    target: PropTypes.string,
    action: PropTypes.string,
    method: PropTypes.oneOf(['POST', 'GET']),
    validator: PropTypes.shape({
        validate: PropTypes.func.isRequired
    })
};

Form.defaultProps = {
    validator
};

Form.childContextTypes = {
    attachForm: PropTypes.func,
    detachForm: PropTypes.func,
    validator: PropTypes.shape({
        validate: PropTypes.func.isRequired
    }),
    pointer: PropTypes.string.isRequired
};

/**
 * @file melon/Validity
 * @author leon(ludafa@outlook.com)
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {create} from './classname/cxBuilder';
import V from './validator/Validity';
import shallowEqual from './util/shallowEqual';

const cx = create('Validity');

export default class Validity extends PureComponent {

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps);
    }

    render() {
        const validity = this.props.validity;

        const isValid = validity ? validity.isValid() : true;
        const message = validity ? validity.getMessage() : null;

        const statefulClassName = cx(this.props)
            .addStates({
                valid: isValid,
                invalid: !isValid
            })
            .build();

        return (
            <div className={statefulClassName}>
                {message}
            </div>
        );
    }
}

Validity.displayName = 'Validity';

Validity.propTypes = {
    validity: PropTypes.instanceOf(V)
};

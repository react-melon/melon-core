/**
 * @file melon/Toggle
 * @author cxtom<cxtom2010@gmail.com>
 * @author leon<ludafa@outlook.com>
 */

const React = require('react');
const cx = require('melon-classname').create('Toggle');
const Validity = require('./Validity');

const Toggle = React.createClass({

    displayName: 'Toggle',

    onChange(e) {

        const {
            disabled,
            readOnly,
            onChange,
            trueValue,
            falseValue
        } = this.props;

        if (disabled || readOnly) {
            return;
        }

        onChange({
            type: 'change',
            target: this,
            value: e.target.checked ? trueValue : falseValue
        });

    },

    renderBar() {

        return (
            <div className={cx().part('bar-container').build()}>
                <div className={cx().part('bar').build()} />
                <div className={cx().part('circle').build()} />
            </div>
        );

    },

    render() {

        const {
            props,
            onChange
        } = this;

        const {
            name,
            value,
            trueValue,
            validity
        } = props;

        const checked = value === trueValue;

        return (
            <label className={cx(props).addStates({checked}).build()}>
                <input
                    type="checkbox"
                    name={name}
                    value={value}
                    onChange={onChange}
                    checked={checked} />
                {this.renderBar()}
                <Validity validity={validity} />
            </label>
        );

    }

});

Toggle.defaultProps = {
    trueValue: 'on',
    falseValue: ''
};

const {PropTypes} = React;

Toggle.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    trueValue: PropTypes.string.isRequired,
    falseValue: PropTypes.string,
    onChange: PropTypes.func
};

module.exports = require('./createInputComponent').create(Toggle);

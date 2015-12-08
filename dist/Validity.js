define('melon-core/Validity', [
    'require',
    'exports',
    'module',
    'react',
    'melon-classname',
    './validator/Validity'
], function (require, exports, module) {
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('Validity');
    var Validity = React.createClass({
        displayName: 'Validity',
        render: function render() {
            var validity = this.props.validity;
            if (!validity) {
                return null;
            }
            var isValid = validity.isValid();
            var message = validity.getMessage();
            var statefulClassName = cx(this.props).addStates({
                valid: isValid,
                invalid: !isValid
            }).build();
            return React.createElement('div', { className: statefulClassName }, message);
        }
    });
    var PropTypes = React.PropTypes;
    Validity.propTypes = { validity: PropTypes.instanceOf(require('./validator/Validity')) };
    module.exports = Validity;
});
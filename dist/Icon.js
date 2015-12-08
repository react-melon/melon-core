define('melon-core/Icon', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('Icon');
    function Icon(props) {
        var icon = props.icon;
        var rest = babelHelpers.objectWithoutProperties(props, ['icon']);
        return React.createElement('i', babelHelpers.extends({}, rest, {
            'data-icon': icon,
            className: cx(props).build()
        }));
    }
    Icon.propTypes = { icon: React.PropTypes.string.isRequired };
    Icon.displayName = 'Icon';
    module.exports = Icon;
});
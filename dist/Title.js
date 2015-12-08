define('melon-core/Title', [
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
    var cx = require('melon-classname').create('Title');
    function Title(props) {
        var level = props.level;
        var rest = babelHelpers.objectWithoutProperties(props, ['level']);
        return React.createElement('h' + level, babelHelpers.extends({}, rest, { className: cx(props).build() }));
    }
    Title.propsTypes = { level: React.PropTypes.number.isRequired };
    module.exports = Title;
});
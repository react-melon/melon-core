define('melon-core/Card', [
    'require',
    'exports',
    'module',
    'react',
    'melon-classname'
], function (require, exports, module) {
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('Card');
    function Card(props) {
        var children = props.children;
        return React.createElement('div', { className: cx(props).build() }, children);
    }
    module.exports = Card;
});
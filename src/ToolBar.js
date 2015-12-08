/**
 * @file ToolBar
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const cx = require('melon-classname').create('ToolBar');

const ToolBar = React.createClass({

    displayName: 'ToolBar',

    render() {

        const {props} = this;
        const {children} = props;

        return (
            <div className={cx(props).build()}>
                {children}
            </div>
        );
    }

});

module.exports = ToolBar;

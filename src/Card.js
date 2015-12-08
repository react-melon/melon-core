/**
 * @file Card
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const cx = require('melon-classname').create('Card');

function Card(props) {

    const {children} = props;

    return (
        <div className={cx(props).build()}>
            {children}
        </div>
    );

}

module.exports = Card;

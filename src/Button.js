/**
 * @file esui-react/Button
 * @author leon<lupengyu@baidu.com>
 */

const React = require('react');
const cx = require('melon-classname').create('Button');

function Button(props) {

    const {
        label,
        children,
        disabled,
        ...others
    } = props;

    const className = cx(props)
        .addVariants({
            icon: React.Children.count(children) === 1
                && typeof children === 'object'
                && children.type.displayName === 'Icon'
        })
        .build();

    return (
        <button
            {...others}
            disabled={disabled}
            className={className}>
            {label || children}
        </button>
    );

}

module.exports = Button;

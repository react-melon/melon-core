/**
 * @file separate popup helper
 * @author cxtom (cxtom2008@gmail.com)
 */

import ReactDOM from 'react-dom';

export function createContainer(component, className, wrapper) {

    if (!wrapper) {
        wrapper = document.body;
    }

    let container = component.container = document.createElement('div');
    container.className = className;

    wrapper.appendChild(container);

    return container;
}

export function destoryContainer({container}) {

    if (container) {
        ReactDOM.unmountComponentAtNode(container);
        container.parentElement.removeChild(container);
        container = null;
    }
}

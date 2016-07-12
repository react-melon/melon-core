/**
* Copyright 2016 Baidu Inc. All rights reserved.
*
* @file separatePopupHelper test unit
* @author cxtom <cxtom2008@gamil.com>
*/

import React, {Component} from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import * as separatePopupHelper from '../../../src/util/separatePopupHelper';


class TestComponent extends Component {

    componentDidMount() {
        render(
            <div id="test" />,
            separatePopupHelper.createContainer(this, 'ui-test-component-popup', this.props.wrapper)
        );
    }

    componentWillUnmount() {
        separatePopupHelper.destoryContainer(this);
    }

    render() {
        return (<div></div>);
    }
}

TestComponent.displayName = 'TestComponent';

describe('separatePopupHelper', function () {

    let container;

    beforeEach(function () {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(function () {
        container.parentElement.removeChild(container);
        container = null;
    });

    it('work', function (done) {

        render(<TestComponent />, container, function () {
            expect(document.querySelector('.ui-test-component-popup')).toNotEqual(null);
            expect(document.querySelector('#test')).toNotEqual(null);

            unmountComponentAtNode(container);
            expect(document.querySelector('.ui-test-component-popup')).toEqual(null);
            expect(document.querySelector('#test')).toEqual(null);
            done();
        });

    });
});

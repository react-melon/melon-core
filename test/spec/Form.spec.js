/**
 * @file Form单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Form from '../../src/Form';
import validator from '../../src/Validator';
import InputComponent from '../../src/InputComponent';
import {renderIntoDocument, findRenderedDOMComponentWithTag} from 'react-dom/test-utils';
import {shallow, mount} from 'enzyme';

class InputComponentTest extends InputComponent {

    change(value) {
        super.onChange({
            value,
            type: 'change',
            target: this
        });
    }

    render() {
        const value = this.state.value;
        return (<div>{value}</div>);
    }

}

InputComponentTest.contextTypes = InputComponent.contextTypes;
InputComponentTest.childContextTypes = InputComponent.childContextTypes;

describe('Form', () => {

    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
        container = null;
    });

    it('dom', () => {
        let wrapper = shallow(<Form />);
        expect(wrapper.is('form')).toBe(true)
    });

    it('should have `fields`', () => {

        let wrapper = mount(
            <Form>
                <InputComponentTest defaultValue={1} />
                <InputComponentTest defaultValue={1} />
            </Form>
        );

        let instance = wrapper.instance();

        expect(instance.fields.length).toBe(2);

        wrapper.unmount();

        expect(instance.fields).toBe(null);

        instance = null;

    });

    it('functions', done => {

        let spy = jasmine.createSpy();

        class TestComponent extends Component {
            state = {
                showText2: true
            };
            render() {
                const input2 = this.state.showText2
                    ? (
                        <InputComponentTest
                            name="textbox2"
                            defaultValue=""
                            rules={{required: true}} />
                    )
                    : null;
                return (
                    <Form ref="form" onSubmit={spy}>
                        <InputComponentTest
                            name="textbox1"
                            defaultValue="1"
                            rules={{required: true}} />
                        {input2}
                        <InputComponentTest
                            name="textbox3"
                            defaultValue="3"
                            disabled={true}
                            rules={{required: true}} />
                        <button type="submit">submit</button>
                    </Form>
                );
            }
        }

        let component = renderIntoDocument(<TestComponent />);

        const form = component.refs.form;
        expect(form.fields.length).toBe(3);
        expect(form.getData()).toEqual({
            textbox1: '1',
            textbox2: ''
        });

        let validity = form.checkValidity();

        expect(validity.isValid).toBe(false);
        expect(validity.errors.length).toBe(1);
        expect(form.validate()).toBe(false);

        const node = findRenderedDOMComponentWithTag(form, 'form');
        TestUtils.Simulate.submit(node);

        expect(spy.calls.count()).toEqual(0);

        component.setState({showText2: false}, () => {
            expect(form.fields.length).toBe(2);
            expect(form.isValidFormField(form.fields[0])).toBe(true);
            expect(form.getData()).toEqual({
                textbox1: '1'
            });
            TestUtils.Simulate.submit(node);
            expect(spy.calls.count()).toEqual(1);
            done();
        });

    });

});

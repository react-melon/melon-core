/**
 * @file Form单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Form from '../../src/Form';
import validator from '../../src/Validator';
import InputComponent from '../../src/InputComponent';

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
        let renderer = TestUtils.createRenderer();
        renderer.render(
            <Form />
        );
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <form onSubmit={function noRefCheck() {}} validator={validator}></form>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

    it('functions', done => {

        let component;
        let spy = jasmine.createSpy();

        const TestComponent = React.createClass({

            getInitialState() {

                component = this;

                return {
                    showText2: true
                };
            },

            render() {

                return (
                    <Form ref="form" onSubmit={spy}>
                        <InputComponentTest
                            name="textbox1"
                            defaultValue="1"
                            rules={{required: true}} />
                        {this.state.showText2 ? (
                            <InputComponentTest
                                name="textbox2"
                                defaultValue=""
                                rules={{required: true, requiredErrorMessage: 'test'}} />
                        ) : null}
                        <InputComponentTest
                            name="textbox3"
                            defaultValue="3"
                            disabled={true}
                            rules={{required: true}} />
                        <button type="submit">submit</button>
                    </Form>
                );
            }
        });

        ReactDOM.render(<TestComponent />, container, () => {

            const form = component.refs.form;
            expect(form.fields.length).toBe(3);
            expect(form.getData()).toEqual({
                textbox1: '1',
                textbox2: ''
            });

            let check = form.checkValidity();

            expect(check.isValid).toBe(false);
            expect(check.errors.length).toBe(1);
            expect(form.fields[1].state.validity.getMessage()).toBe('test');
            expect(form.validate()).toBe(false);

            const node = document.getElementsByTagName('form')[0];
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

});

/**
 * @file Input Component Unit Test
 * @author Leon Lu(ludafa@baidu.com)
 */

import React, {Component, PropTypes} from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {createRenderer, renderIntoDocument, findRenderedComponentWithType} from 'react-addons-test-utils';

import {create} from '../../src/classname/cxBuilder';
import InputComponent from '../../src/InputComponent';

import then from '../then';

const cx = create('InputComponentTest');

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
        const className = cx(this.props).addStates(this.getStyleStates()).build();
        return (<div className={className}>{value}</div>);
    }

}

InputComponentTest.contextTypes = InputComponent.contextTypes;
InputComponentTest.defaultProps = InputComponent.defaultProps;
InputComponentTest.propTypes = InputComponent.propTypes;

describe('InputComponent', function () {

    it('should get value in state from props', function () {

        const renderer = createRenderer();

        renderer.render(
            <InputComponentTest value={1} onChange={() => {}} />
        );

        const actualElement = renderer.getRenderOutput();

        const expectedElement = (
            <div className="ui-input-component-test">1</div>
        );

        expect(actualElement).toEqualJSX(expectedElement);

    });

    it('state class names', function () {

        const renderer = createRenderer();

        renderer.render(
            <InputComponentTest value={1} disabled readOnly valid />
        );

        expect(renderer.getRenderOutput()).toEqualJSX(
            <div
                className="ui-input-component-test state-disabled state-read-only state-valid">1</div>
        );

        renderer.render(
            <InputComponentTest
                value={1}
                disabled={false}
                readOnly={false}
                valid={false}
                onChange={() => {}} />
        );

        expect(renderer.getRenderOutput()).toEqualJSX(
            <div className="ui-input-component-test state-invalid">1</div>
        );


    });

    it('defaultValue', function () {

        const renderer = createRenderer();

        renderer.render(
            <InputComponentTest defaultValue={1} />
        );

        const actualElement = renderer.getRenderOutput();

        const expectedElement = (<div className="ui-input-component-test">1</div>);

        expect(actualElement).toEqualJSX(expectedElement);

    });

    it('should try to attach/detach to a form', function () {

        const attachFormSpy = jasmine.createSpy('attach');
        const detachFormSpy = jasmine.createSpy('detach');

        class Form extends Component {

            getChildContext() {
                return {
                    attachForm: attachFormSpy,
                    detachForm: detachFormSpy
                };
            }

            render() {
                return this.props.children;
            }

        }

        Form.childContextTypes = {
            attachForm: PropTypes.func,
            detachForm: PropTypes.func
        };

        let container = document.createElement('div');
        document.body.appendChild(container);

        render(
            <Form>
                <InputComponentTest value={1} onChange={() => {}} />
            </Form>,
            container,
            function () {
                expect(attachFormSpy).toHaveBeenCalled();
                unmountComponentAtNode(container);
                expect(detachFormSpy).toHaveBeenCalled();
                document.body.removeChild(container);
                container = null;
            }
        );


    });

    it('isReadOnly/isDisabled', function () {

        class Test extends Component {

            render() {

                return (
                    <InputComponentTest
                        disabled={true}
                        readOnly={false}
                        defaultValue='default-value'
                        onChange={e => {
                            expect(e.value).toBe('123');
                        }} />
                );

            }

        }

        const component = renderIntoDocument(<Test />);
        const input = findRenderedComponentWithType(
            component,
            InputComponentTest
        );

        expect(typeof input.isReadOnly).toBe('function');
        expect(input.isReadOnly()).toBe(false);

        expect(typeof input.isDisabled).toBe('function');
        expect(input.isDisabled()).toBe(true);

    });

    it('`pure-render`', function () {

        const renderer = createRenderer();

        let renderAmount = 0;

        class InputComponetTest extends InputComponent {

            render() {
                renderAmount++;
                const value = this.state.value;
                return (<div>{value}</div>);
            }

        }

        const changeHandler = () => {};

        renderer.render(
            <InputComponetTest value={1} onChange={changeHandler} />
        );

        renderer.render(
            <InputComponetTest value={1} onChange={changeHandler} />
        );

        expect(renderAmount).toBe(1);

        renderer.render(
            <InputComponetTest value={2} onChange={changeHandler} />
        );

        expect(renderAmount).toBe(2);

    });

});

describe('InputComponent: Controlled', () => {

    it('sync `value` props to `value` state', function (done) {

        class TestComponent extends Component {

            constructor(props) {
                super(props);
                this.state = {
                    value: ''
                };
            }

            setValue(value) {
                this.setState({value});
            }


            render() {
                return (
                    <InputComponentTest
                        value={this.state.value}
                        onChange={() => {}} />
                );
            }

        }

        const component = renderIntoDocument(<TestComponent />);
        const input = findRenderedComponentWithType(
            component,
            InputComponentTest
        );

        expect(input.getValue()).toBe('');

        const newValue1 = '123';

        component.setValue(newValue1);

        then(() => {
            expect(input.getValue()).toBe(newValue1);
            done();
        });

    });

    it('value not change even though change it manually', function (done) {

        const INITIAL_VALUE = '123';

        class TestComponent extends Component {

            constructor(props) {
                super(props);
                this.state = {
                    value: INITIAL_VALUE
                };
            }

            render() {
                return (
                    <InputComponentTest
                        value={this.state.value}
                        onChange={() => {}} />
                );
            }

        }

        const component = renderIntoDocument(<TestComponent />);
        const input = findRenderedComponentWithType(
            component,
            InputComponentTest
        );

        expect(input.getValue()).toBe(INITIAL_VALUE);

        const newValue = '456';

        input.change(newValue);

        then(() => {
            expect(input.getValue()).toBe(INITIAL_VALUE);
            done();
        });

    });

});

describe('InputComponent：Uncontrolled', () => {

    it('will not change while defaultValue change', done => {

        const INITIAL_DEFAULT_VALUE = 'initial-default-value';

        class UncontrolledComponent extends Component {

            constructor(...args) {
                super(...args);
                this.state = {
                    defaultValue: INITIAL_DEFAULT_VALUE
                };
            }

            rerender(defaultValue) {
                this.setState({
                    defaultValue
                });
            }

            render() {

                return (
                    <InputComponentTest
                        defaultValue={this.state.defaultValue} />
                );

            }

        }

        let component = renderIntoDocument(
            <UncontrolledComponent />
        );

        let input = findRenderedComponentWithType(
            component,
            InputComponentTest
        );

        expect(input.state.value).toBe(INITIAL_DEFAULT_VALUE);

        const random = Math.round(Math.random() * 1000);
        component.rerender(random);

        then(() => {
            expect(input.state.value).toBe(INITIAL_DEFAULT_VALUE);
            expect(input.state.value).not.toBe(random);
            done();
        });

    });

    it('will trigger onChange', function (done) {

        const spy = jasmine.createSpy('UncontrolledInputComponentChange');

        class UncontrolledComponent extends Component {

            render() {

                return (
                    <InputComponentTest
                        defaultValue='default-value'
                        onChange={spy} />
                );

            }

        }

        const component = renderIntoDocument(<UncontrolledComponent />);
        const input = findRenderedComponentWithType(
            component,
            InputComponentTest
        );

        expect(input.getValue()).toBe('default-value');

        input.change('123');

        then(() => {
            expect(input.state.value).toBe('123');
            expect(spy).toHaveBeenCalled();
            done();
        });

    });

});

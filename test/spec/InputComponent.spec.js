/**
 * @file Input Component Unit Test
 * @author Leon Lu(ludafa@baidu.com)
 */

import {shallow} from 'enzyme';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {render, unmountComponentAtNode} from 'react-dom';
import {renderIntoDocument, findRenderedComponentWithType} from 'react-dom/test-utils';

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

        let wrapper = shallow(
            <InputComponentTest value={1} onChange={() => {}} />
        );

        expect(wrapper.is('div')).toBe(true);
        expect(wrapper.text()).toBe('1');

    });

    it('state class names', function () {

        let wrapper = shallow(
            <InputComponentTest
                value={1}
                disabled
                readOnly
                valid
                onChange={() => {}}
            />
        );

        expect(wrapper.hasClass('state-disabled')).toBe(true);
        expect(wrapper.hasClass('state-read-only')).toBe(true);
        expect(wrapper.hasClass('state-valid')).toBe(true);

        wrapper.setProps({
            disabled: false,
            readOnly: false,
            valid: false
        });

        expect(wrapper.hasClass('state-disabled')).toBe(false);
        expect(wrapper.hasClass('state-read-only')).toBe(false);
        expect(wrapper.hasClass('state-valid')).toBe(false);

    });

    it('defaultValue', function () {

        let wrapper = shallow(
            <InputComponentTest defaultValue={1} />
        );

        expect(wrapper.text()).toBe('1');

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

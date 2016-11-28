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
            <InputComponentTest value={1}/>
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
                valid={false} />
        );

        expect(renderer.getRenderOutput()).toEqualJSX(
            <div className="ui-input-component-test state-invalid">1</div>
        );


    });

    it('defaultValue', function () {

        const renderer = createRenderer();

        renderer.render(
            <InputComponentTest defaultValue={1}/>
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
            <Form><InputComponentTest value={1} /></Form>,
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

    it('uncontrolled', function (done) {

        class UncontrolledComponent extends Component {

            render() {

                return (
                    <InputComponentTest
                        defaultValue='default-value'
                        onChange={e => {
                            expect(e.value).toBe('123');
                        }} />
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
            input.change('123');
        })
        .then(() => {
            expect(input.state.value).toBe('123');
            done();
        });

    });

    it('controlled', function (done) {

        const changeSpy = jasmine.createSpy();

        class TestComponent extends Component {

            constructor(props) {
                super(props);
                this.state = {
                    value: ''
                };
                this.onChange = this.onChange.bind(this);
            }

            onChange({value}) {
                this.setState({value}, changeSpy);
            }

            render() {
                return (
                    <InputComponentTest
                        value={this.state.value}
                        onChange={this.onChange} />
                );
            }
        }

        const component = renderIntoDocument(<TestComponent />);
        const input = findRenderedComponentWithType(component, InputComponentTest);

        expect(input.getValue()).toBe('');

        input.change('456');

        then(() => {
            expect(input.getValue()).toBe('456');
            expect(changeSpy).toHaveBeenCalled();
            input.change('123');
        })
        .then(() => {
            expect(input.getValue()).toBe('123');
            done();
        });

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

        renderer.render(
            <InputComponetTest value={1} />
        );

        renderer.render(
            <InputComponetTest value={1} />
        );

        expect(renderAmount).toBe(1);

        renderer.render(
            <InputComponetTest value={2} />
        );

        expect(renderAmount).toBe(2);

    });

});

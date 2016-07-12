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
InputComponentTest.childContextTypes = InputComponent.childContextTypes;
InputComponentTest.defaultProps = InputComponent.defaultProps;
InputComponentTest.propTypes = InputComponent.propTypes;

describe('InputComponent', function () {

    it('should get value in state from props', function () {

        const renderer = createRenderer();

        renderer.render(
            <InputComponentTest value={1}/>
        );

        const actualElement = renderer.getRenderOutput();

        const expectedElement = (<div className="ui-input-component-test">1</div>);

        expect(actualElement).toEqualJSX(expectedElement);

    });

    it('disable readOnly className', function () {

        const renderer = createRenderer();

        renderer.render(
            <InputComponentTest value={1} disabled readOnly/>
        );

        const actualElement = renderer.getRenderOutput();

        const expectedElement = (<div className="ui-input-component-test state-disabled state-read-only">1</div>);

        expect(actualElement).toEqualJSX(expectedElement);

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
                console.log(attachFormSpy.calls.count());
                expect(attachFormSpy).toHaveBeenCalled();
                unmountComponentAtNode(container);
                expect(detachFormSpy).toHaveBeenCalled();
                document.body.removeChild(container);
                container = null;
            }
        );


    });

    it('controled', function (done) {

        const changeSpy = jasmine.createSpy();

        class TestComponent extends Component {

            constructor(props) {
                super(props);
                this.state = {};
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

        input.change('123');

        then(() => {
            expect(input.getValue()).toBe('123');
            expect(changeSpy).toHaveBeenCalled();
            input.change('123');
        })
        .then(() => {
            expect(input.getValue()).toBe('123');
            done();
        });

    });

    it('validate', function (done) {

        class TestComponent extends Component {

            constructor(props) {
                super(props);
                this.state = {value: ''};
            }

            render() {
                return (
                    <InputComponentTest
                        rules={{
                            required: true,
                            requiredErrorMessage: 'test'
                        }}
                        value={this.state.value}  />
                );
            }
        }

        const component = renderIntoDocument(<TestComponent />);
        const input = findRenderedComponentWithType(component, InputComponentTest);

        component.setState({value: null});

        then(() => {
            expect(input.getValue()).toBe(null);
            expect(input.state.validity.isValid()).toBe(false);
            expect(input.state.validity.getMessage()).toBe('test');
            component.setState({value: '22'});
        })
        .then(() => {
            expect(input.state.validity.isValid()).toBe(true);
            input.change(undefined);
        })
        .then(() => {
            expect(input.state.validity.isValid()).toBe(false);
            expect(input.validate().isValid()).toBe(false);
            done();
        });

    });

});

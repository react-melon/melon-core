/**
 * @file Input Component Unit Test
 * @author Leon Lu(ludafa@baidu.com)
 */

import React, {Component, PropTypes} from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import {createRenderer, renderIntoDocument, findRenderedComponentWithType} from 'react-addons-test-utils';

import InputComponent from '../../src/InputComponent';

import then from '../then';

expect.extend(expectJSX);

class InputComponetTest extends InputComponent {

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


describe('InputComponent', function () {

    it('should get value in state from props', function () {

        const renderer = createRenderer();

        renderer.render(
            <InputComponetTest value={1}/>
        );

        const actualElement = renderer.getRenderOutput();

        const expectedElement = (<div>1</div>);

        expect(actualElement).toEqualJSX(expectedElement);

    });

    it('defaultValue', function () {

        const renderer = createRenderer();

        class InputComponetTest extends InputComponent {

            render() {
                const value = this.state.value;
                return (<div>{value}</div>);
            }

        }

        renderer.render(
            <InputComponetTest defaultValue={1}/>
        );

        const actualElement = renderer.getRenderOutput();

        const expectedElement = (<div>1</div>);

        expect(actualElement).toEqualJSX(expectedElement);

    });

    it('should try to attach/detach to a form', function () {

        const attachFormSpy = expect.createSpy();
        const detachFormSpy = expect.createSpy();

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


        class InputComponetTest extends InputComponent {

            render() {
                const value = this.state.value;
                return (<div>{value}</div>);
            }

        }

        let container = document.createElement('div');
        document.body.appendChild(container);

        render(
            <Form><InputComponetTest value={1} /></Form>,
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

    it('controled', function (done) {

        const changeSpy = expect.createSpy();

        class TestComponent extends Component {

            constructor(props) {
                super(props);
                this.state = {value: undefined};
                this.onChange = this.onChange.bind(this);
            }

            onChange({value}) {
                this.setState({value}, changeSpy);
            }

            render() {
                return (
                    <InputComponetTest
                        value={this.state.value}
                        onChange={this.onChange} />
                );
            }
        }

        const component = renderIntoDocument(<TestComponent />);
        const input = findRenderedComponentWithType(component, InputComponetTest);

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

});

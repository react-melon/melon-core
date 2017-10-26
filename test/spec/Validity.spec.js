/**
 * @file Validity spec
 * @author leon <ludafa@outlook.com>
 */

import Validity from '../../src/validator/Validity';

describe('Validity', () => {

    it('addState', () => {
        let v = new Validity();
        expect(typeof v.addState).toBe('function');
        v.addState({
            isValid: false
        });
        expect(v.states.length).toBe(1);
    });

    it('isValid / getMessage', () => {
        let v = new Validity();
        expect(typeof v.isValid).toBe('function');
        expect(v.isValid()).toBe(true);
        expect(v.getMessage()).toBe('');
        v.addState({isValid: false, message: 'hi error'});
        expect(v.isValid()).toBe(false);
        expect(v.getMessage()).toBe('hi error');
    });

});

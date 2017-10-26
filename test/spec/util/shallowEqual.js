/**
 * @file shallowEqual test
 * @author leon <ludafa@outlook.com>
 */

import shallowEqual from '../../../src/util/shallowEqual';

describe('shallowEqual', () => {

    it('work', () => {
        expect(shallowEqual({a: 1}, {a: 1})).toBe(true);
    });

    it('custom compare', () => {
        let context = {};
        let spy = {
            compare(a, b) {
                expect(this).toBe(context);
                return typeof a === 'string' ? a === b : undefined;
            }
        };
        spyOn(spy, 'compare').and.callThrough();
        let a = {name: 'a'};
        let b = {name: 'b'};
        expect(shallowEqual(a, b, spy.compare, context)).toBe(false);
        expect(spy.compare).toHaveBeenCalledWith(a, b);
        expect(shallowEqual('a', 'b', spy.compare, context)).toBe(false);

    });

    it('should be object or array', () => {
        expect(shallowEqual(1, {})).toBe(false);
        expect(shallowEqual(false, {})).toBe(false);
        expect(shallowEqual(null, {})).toBe(false);
        expect(shallowEqual(undefined, {})).toBe(false);
    });

    it('have same count of properties', () => {
        expect(shallowEqual({}, {a: 1})).toBe(false);
        expect(shallowEqual([], [1])).toBe(false);
    });

    it('should not have any prototype property', () => {
        function Test() {}
        Test.prototype.name = 'test';
        expect(shallowEqual(new Test(), {name: 'test'})).toBe(false);
        expect(shallowEqual({name: 'test'}, new Test())).toBe(false);
    });

});

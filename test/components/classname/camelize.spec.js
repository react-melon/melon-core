/**
* Copyright 2016 Baidu Inc. All rights reserved.
*
* @file camelize test unit
* @author cxtom <cxtom2008@gamil.com>
*/

import {
    camelize,
    pascalize,
    hyphenate
} from '../../../src/util/string';

describe('camelize', function () {

    it('work', function () {
        expect(camelize('a-b')).toEqual('aB');
        expect(camelize('a-b-c')).toEqual('aBC');
    });

    it('null', function () {
        expect(camelize()).toEqual('');
    });

});

describe('pascalize', function () {

    it('work', function () {
        expect(pascalize('aa-bb')).toEqual('AaBb');
    });

});

describe('hyphenate', function () {

    it('work', function () {
        expect(hyphenate('AaBb')).toEqual('aa-bb');
    });

});

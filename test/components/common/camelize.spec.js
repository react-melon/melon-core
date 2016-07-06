/**
* Copyright 2016 Baidu Inc. All rights reserved.
*
* @file camelize test unit
* @author cxtom <cxtom2008@gamil.com>
*/


import camelize from '../../../src/classname/camelize';
import expect from 'expect';

describe('camelize', function () {

    it('work', function () {
        expect(camelize('a-b')).toEqual('aB');
        expect(camelize('a-b-c')).toEqual('aBC');
    });

    it('null', function () {
        expect(camelize()).toEqual('');
    });

});

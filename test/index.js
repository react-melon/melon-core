/**
 * @file test
 * @author leon <ludafa@outlook.com>
 */

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({
    adapter: new Adapter()
});

const specContext = require.context('./spec', true)
specContext.keys().forEach(specContext)

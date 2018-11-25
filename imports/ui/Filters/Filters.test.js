import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import Filters from './Filters';

describe('Filters', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Filters filters={Map()} />);
	});

	it('contains a div', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});
});

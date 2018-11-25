import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import { Box } from 'bloomer';

import Filters from './Filters';

describe('Filters', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Filters filters={Map()} />);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('contains a Box', () => {
		expect(wrapper.find(Box).length).toEqual(1);
	});
});

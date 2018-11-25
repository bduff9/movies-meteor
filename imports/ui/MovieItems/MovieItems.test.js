import React from 'react';
import { shallow } from 'enzyme';

import MovieItems from './MovieItems';

describe('MovieItems', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<MovieItems />);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

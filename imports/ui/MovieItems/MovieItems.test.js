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

	it('contains a div', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});
});

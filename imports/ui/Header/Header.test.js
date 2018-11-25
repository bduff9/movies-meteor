import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

describe('Header', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Header />);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

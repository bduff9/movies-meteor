import React from 'react';
import { shallow } from 'enzyme';

import LoginPage from './LoginPage';

describe('LoginPage', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<LoginPage />);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});

	test.todo('Add more tests to login page');
});

import React from 'react';
import { shallow } from 'enzyme';

import MovieItemForm from './MovieItemForm';

describe('MovieItemForm', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<MovieItemForm movieItem={{}} />);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

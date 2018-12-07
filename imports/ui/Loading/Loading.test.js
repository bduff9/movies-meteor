import React from 'react';
import { shallow } from 'enzyme';

import Loading from './Loading.jsx';

describe('Loading', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Loading />);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

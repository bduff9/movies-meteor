import React from 'react';
import { shallow } from 'enzyme';

import ButtonLink from './ButtonLink';

describe('ButtonLink', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<ButtonLink to="/" />);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

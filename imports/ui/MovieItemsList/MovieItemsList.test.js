import React from 'react';
import { shallow } from 'enzyme';

import MovieItemsList from './MovieItemsList';

describe('MovieItemsList', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<MovieItemsList loading={true} movieItems={[]} />);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

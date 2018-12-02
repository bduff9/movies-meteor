import React from 'react';
import { shallow } from 'enzyme';

import MovieItemsGrid from './MovieItemsGrid';

describe('MovieItems', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<MovieItemsGrid loading={true} movieItems={[]} />);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

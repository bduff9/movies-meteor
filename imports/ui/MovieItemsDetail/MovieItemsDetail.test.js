import React from 'react';
import { shallow } from 'enzyme';

import MovieItemsDetail from './MovieItemsDetail';

describe('MovieItemsDetail', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<MovieItemsDetail loading={true} movieItems={[]} />);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

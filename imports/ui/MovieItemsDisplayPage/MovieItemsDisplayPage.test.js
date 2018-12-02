import React from 'react';
import { shallow } from 'enzyme';
import { Map, List } from 'immutable';

import MovieItemsDisplayPage from './MovieItemsDisplayPage';

describe('MovieItemList', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(
			<MovieItemsDisplayPage
				filters={Map()}
				limit={25}
				skip={0}
				sortBy={List()} />);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

import React from 'react';
import { shallow } from 'enzyme';
import { Map, List } from 'immutable';

import MovieItemsContainer from './MovieItemsContainer';

describe('App', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<MovieItemsContainer filters={Map()} sortBy={List()} selectMovieItem={() => null} />);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

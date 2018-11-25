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

	it('contains a div', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});
});

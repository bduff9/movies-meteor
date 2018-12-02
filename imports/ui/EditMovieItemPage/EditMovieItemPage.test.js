import React from 'react';
import { shallow } from 'enzyme';

import EditMovieItemPage from './EditMovieItemPage';

describe('EditMovieItemPage', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<EditMovieItemPage itemID={0} match={{ params: {}}} />);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

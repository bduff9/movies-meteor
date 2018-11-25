import React from 'react';
import { shallow } from 'enzyme';

import EditMovieItem from './EditMovieItem';

describe('EditMovieItem', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<EditMovieItem itemID={0} selectMovieItem={() => null} />);
	});

	it('contains a div', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});
});

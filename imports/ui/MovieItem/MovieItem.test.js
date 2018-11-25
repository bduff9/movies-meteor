import React from 'react';
import { shallow } from 'enzyme';

import MovieItem from './MovieItem';

describe('MovieItem', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<MovieItem movieItem={{ id: 0 }} selectMovieItem={() => null} />);
	});

	it('contains a div', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});
});

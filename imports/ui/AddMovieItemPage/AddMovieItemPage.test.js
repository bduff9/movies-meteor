import React from 'react';
import { shallow } from 'enzyme';

import AddMovieItemPage from './AddMovieItemPage';

describe('AddMovieItemPage', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<AddMovieItemPage />);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

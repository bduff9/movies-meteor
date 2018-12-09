import React from 'react';
import { shallow } from 'enzyme';

import MovieItemMoviesContainer from './MovieItemMoviesContainer';

describe('MovieItemMoviesContainer', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<MovieItemMoviesContainer movieItemID={0} />);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

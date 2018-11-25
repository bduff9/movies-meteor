import React from 'react';
import { shallow } from 'enzyme';

import MovieItemPlaceholder from './MovieItemPlaceholder';

describe('MovieItemPlaceholder', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<MovieItemPlaceholder title={'Test Title'} />);
	});

	it('contains an svg', () => {
		expect(wrapper.find('svg').length).toEqual(1);
	});
});

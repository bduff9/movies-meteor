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

	it('contains a div', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});
});

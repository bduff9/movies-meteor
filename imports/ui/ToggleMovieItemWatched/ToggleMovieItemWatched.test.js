import React from 'react';
import { shallow } from 'enzyme';

import ToggleMovieItemWatched from './ToggleMovieItemWatched';

describe('ToggleMovieItemWatched', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<ToggleMovieItemWatched isWatched={false} itemID={0} />);
	});

	it('contains a div', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});
});

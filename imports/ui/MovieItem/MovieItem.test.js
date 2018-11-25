import React from 'react';
import { shallow } from 'enzyme';

import MovieItem from './MovieItem';

describe('MovieItem', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<MovieItem movieItem={{ id: 0, is3D: 'N', isWatched: 'N', itemName: '', itemStatus: 'Owned', releaseDate: '1970-01-01', formatType: 'Ultra HD', digitalType: 'UV', caseType: 'Slipcover', itemURL: '' }} view="grid" selectMovieItem={() => null} />);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

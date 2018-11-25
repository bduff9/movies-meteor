import React from 'react';
import { shallow } from 'enzyme';

import Toolbar from './Toolbar';
import { List } from 'immutable';

describe('Toolbar', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Toolbar sortBy={List()} toggleFilters={ev => null} />);
	});

	it('contains a div', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});
});

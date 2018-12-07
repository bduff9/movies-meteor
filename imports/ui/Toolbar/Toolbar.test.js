import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';

import Toolbar from './Toolbar.jsx';

describe('Toolbar', () => {
	/**
	 * @type {import('enzyme').ShallowWrapper<any, any, any>} wrapper
	 */
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(
			<Toolbar
				maxPage={1}
				page={1}
				sortBy={List([ List() ])}
				viewAs="Grid"
				changeView={ev => null}
				paginate={(newPage, maxPage) => null}
				sortItems={col => null}
				toggleFilters={ev => null} />
		);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});
});

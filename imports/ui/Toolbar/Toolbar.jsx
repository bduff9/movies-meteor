import React from 'react';
import { Navbar, NavbarDropdown, NavbarEnd, NavbarItem, NavbarLink, NavbarMenu, NavbarStart } from 'bloomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './toolbar.css';

/**
 * @typedef {{
 *  savedViews?: import('../../api/models').SavedView[],
 *  selectedView?: string,
 *  sortBy: import('immutable').List<import('immutable').List<string>>,
 *  paginate: (direction: number) => void,
 *  toggleFilters: (ev: React.MouseEvent<HTMLElement>) => void
 * }} Props
 */

/**
 * @type {React.StatelessComponent<Props>}
 */
const Toolbar = ({ savedViews = [], selectedView = '', sortBy, paginate, toggleFilters }) => (
	<Navbar isTransparent>
		<NavbarMenu>
			<NavbarStart>
				<NavbarItem>
					<select value={selectedView} onChange={() => console.log('changed saved view')}>
						<option value="">-- Select a Saved View --</option>
						{savedViews.map(({ id, name }) => <option value={id} key={`view-${id}`}>{name}</option>)}
					</select>
				</NavbarItem>
			</NavbarStart>
			<NavbarEnd>
				<NavbarItem href="javascript:void(0);" onClick={() => console.log('clicked add')}>
					<FontAwesomeIcon icon="plus" />
				</NavbarItem>
				<NavbarItem hasDropdown isHoverable>
					<NavbarLink href="javascript:void(0);">
						<FontAwesomeIcon icon="th-large" />
					</NavbarLink>
					<NavbarDropdown>
						<button type="button" onClick={() => paginate(-1)}>Prev</button>
						<button type="button" onClick={() => paginate(1)}>Next</button>
						{/*TODO: Show current with check */}
						<NavbarItem href="javascript:void(0);" onClick={() => console.log('clicked grid')}>Grid</NavbarItem>
						<NavbarItem href="javascript:void(0);" onClick={() => console.log('clicked list')}>List</NavbarItem>
						<NavbarItem href="javascript:void(0);" onClick={() => console.log('clicked detail')}>Detail</NavbarItem>
					</NavbarDropdown>
				</NavbarItem>
				<NavbarItem href="javascript:void(0);" onClick={toggleFilters}>
					<FontAwesomeIcon icon="search" />
				</NavbarItem>
				<NavbarItem hasDropdown isHoverable>
					<NavbarLink href="javascript:void(0);">
						<FontAwesomeIcon icon="sort" />
					</NavbarLink>
					<NavbarDropdown>
						{/*TODO: Show current with check, add more?, handle ASC/DESC */}
						<NavbarItem href="javascript:void(0);" onClick={() => console.log('clicked order sort')}>Order</NavbarItem>
						<NavbarItem href="javascript:void(0);" onClick={() => console.log('clicked id sort')}>ID</NavbarItem>
						<NavbarItem href="javascript:void(0);" onClick={() => console.log('clicked title sort')}>Title</NavbarItem>
					</NavbarDropdown>
				</NavbarItem>
			</NavbarEnd>
		</NavbarMenu>
	</Navbar>
);

export default Toolbar;

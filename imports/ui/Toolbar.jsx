'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Navbar, NavbarDropdown, NavbarEnd, NavbarItem, NavbarLink, NavbarMenu, NavbarStart } from 'bloomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/** @type {React.StatelessComponent} */
const Toolbar = ({ toggleFilters }) => (
	<Navbar isTransparent>
		<NavbarMenu>
			<NavbarStart>
				<NavbarItem>
					<select value="" onChange={null}>
						<option value="">-- Select a Saved View --</option>
					</select>
				</NavbarItem>
			</NavbarStart>
			<NavbarEnd>
				<NavbarItem href="javascript:void(0);" onClick={null}>
					<FontAwesomeIcon icon="plus" />
				</NavbarItem>
				<NavbarItem hasDropdown isHoverable>
					<NavbarLink href="javascript:void(0);">
						<FontAwesomeIcon icon="th-large" />
					</NavbarLink>
					<NavbarDropdown>
						{/*TODO: Show current with check */}
						<NavbarItem href="javascript:void(0);" onClick={null}>Grid</NavbarItem>
						<NavbarItem href="javascript:void(0);" onClick={null}>List</NavbarItem>
						<NavbarItem href="javascript:void(0);" onClick={null}>Detail</NavbarItem>
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
						<NavbarItem href="javascript:void(0);" onClick={null}>Order</NavbarItem>
						<NavbarItem href="javascript:void(0);" onClick={null}>ID</NavbarItem>
						<NavbarItem href="javascript:void(0);" onClick={null}>Title</NavbarItem>
					</NavbarDropdown>
				</NavbarItem>
			</NavbarEnd>
		</NavbarMenu>
	</Navbar>
);

Toolbar.propTypes = {
	sortBy: PropTypes.instanceOf(List).isRequired,
	toggleFilters: PropTypes.func.isRequired
};

export default Toolbar;

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Navbar, NavbarDropdown, NavbarEnd, NavbarItem, NavbarLink, NavbarMenu, NavbarStart } from 'bloomer';
import Icon from '@fortawesome/react-fontawesome';
import fasPlus from '@fortawesome/fontawesome-pro-solid/faPlus';
import fasThLarge from '@fortawesome/fontawesome-pro-solid/faThLarge';
import fasSearch from '@fortawesome/fontawesome-pro-solid/faSearch';
import fasSort from '@fortawesome/fontawesome-pro-solid/faSort';


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
					<Icon icon={fasPlus} />
				</NavbarItem>
				<NavbarItem hasDropdown isHoverable>
					<NavbarLink href="javascript:void(0);">
						<Icon icon={fasThLarge} />
					</NavbarLink>
					<NavbarDropdown>
						{/*TODO: Show current with check */}
						<NavbarItem href="javascript:void(0);" onClick={null}>Grid</NavbarItem>
						<NavbarItem href="javascript:void(0);" onClick={null}>List</NavbarItem>
						<NavbarItem href="javascript:void(0);" onClick={null}>Detail</NavbarItem>
					</NavbarDropdown>
				</NavbarItem>
				<NavbarItem href="javascript:void(0);" onClick={toggleFilters}>
					<Icon icon={fasSearch} />
				</NavbarItem>
				<NavbarItem hasDropdown isHoverable>
					<NavbarLink href="javascript:void(0);">
						<Icon icon={fasSort} />
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

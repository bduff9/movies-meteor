'use strict';

import React from 'react';
import { Hero, HeroHeader, Navbar, NavbarBrand, NavbarEnd, NavbarItem } from 'bloomer';

const Header = () => {
	return (
		<Hero>
			<HeroHeader>
				<Navbar>
					<NavbarBrand>
						<NavbarItem>Media Tracker</NavbarItem>
					</NavbarBrand>
					<NavbarEnd>
						<NavbarItem href="javascript:void(0);">Home</NavbarItem>
					</NavbarEnd>
				</Navbar>
			</HeroHeader>
		</Hero>
	);
};

export default Header;

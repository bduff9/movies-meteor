import React, { PureComponent } from 'react';
import { Hero, HeroHeader, Navbar, NavbarBrand, NavbarEnd, NavbarItem, NavbarMenu } from 'bloomer';

import './header.css';

/**
 * @typedef {{}} Props
 */

/**
 * @type {PureComponent<Props>}
 */
class Header extends PureComponent {
	render () {
		return (
			<Hero>
				<HeroHeader>
					<Navbar>
						<NavbarBrand>
							<NavbarItem>Media Tracker</NavbarItem>
						</NavbarBrand>
						<NavbarMenu>
							<NavbarEnd>
								<NavbarItem href="javascript:void(0);"></NavbarItem>
							</NavbarEnd>
						</NavbarMenu>
					</Navbar>
				</HeroHeader>
			</Hero>
		);
	}
}

export default Header;

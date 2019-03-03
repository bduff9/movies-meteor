import React, { PureComponent } from 'react';
import { Hero, HeroHeader, Navbar, NavbarBrand, NavbarEnd, NavbarItem, NavbarMenu } from 'bloomer';

import './header.css';

import { AuthConsumer } from '../../auth/auth.service';

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
								<AuthConsumer>
									{({ isSignedIn, logout }) => (isSignedIn && <NavbarItem href="javascript:void(0);" onClick={logout}>Log out</NavbarItem>)}
								</AuthConsumer>
							</NavbarEnd>
						</NavbarMenu>
					</Navbar>
				</HeroHeader>
			</Hero>
		);
	}
}

export default Header;

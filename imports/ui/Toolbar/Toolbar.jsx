import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Navbar, NavbarDropdown, NavbarEnd, NavbarItem, NavbarLink, NavbarMenu, NavbarStart } from 'bloomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './toolbar.css';

import { VIEWS } from '../../api/constants';

/**
 * @typedef {{
 *  maxPage: number,
 *  page: number,
 *  savedViews?: import('../../api/models').SavedView[],
 *  selectedView?: string,
 *  sortBy: import('immutable').List<import('immutable').List<string>>,
 *  viewAs: string,
 *  changeView: (newView: string) => void,
 *  paginate: (newPage: (number | string), maxPage: number) => void,
 *  sortItems: (col: string) => void,
 *  toggleFilters: (ev: React.MouseEvent<HTMLElement>) => void
 * }} Props
 */

/**
 * @type {React.StatelessComponent<Props>}
 */
const Toolbar = ({ maxPage, page, savedViews = [], selectedView = '', sortBy, viewAs, changeView, paginate, sortItems, toggleFilters }) => {
	const [sortCol, sortDir] = sortBy.get(0).toArray();

	/**
	 * @param {string} col
	 */
	const _displayCurrentSort = col => {
		if (sortCol !== col) return <FontAwesomeIcon icon={['far', 'sort']} />;

		if (sortDir === 'ASC') return <FontAwesomeIcon icon="sort-up" />;

		return <FontAwesomeIcon icon="sort-down" />;
	};

	/**
	 * @returns {import('@fortawesome/fontawesome-svg-core').IconProp}
	 */
	const _getViewIcon = () => {
		if (viewAs === 'Grid') return 'th-large';

		if (viewAs === 'List') return ['far', 'list'];

		if (viewAs === 'Detail') return ['far', 'table'];

		return 'question-square';
	};

	return (
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
					<NavbarItem className={page < 2 ? 'disabled' : ''} title="Go to first" href="javascript:void(0);" onClick={() => paginate(1, maxPage)}>
						<FontAwesomeIcon icon={['far', 'chevron-double-left']} />
					</NavbarItem>
					<NavbarItem className={page < 2 ? 'disabled' : ''} title="Go to previous" href="javascript:void(0);" onClick={() => paginate(page - 1, maxPage)}>
						<FontAwesomeIcon icon={['far', 'chevron-left']} />
					</NavbarItem>
					<NavbarItem title="Jump to...">
						<Input isSize="small" type="number" value={page} onChange={/** @param {React.FormEvent<HTMLInputElement>} ev */ev => paginate(ev.currentTarget.value, maxPage)} />
					</NavbarItem>
					<NavbarItem className={page >= maxPage ? 'disabled' : ''} title="Go to next" href="javascript:void(0);" onClick={() => paginate(page + 1, maxPage)}>
						<FontAwesomeIcon icon={['far', 'chevron-right']} />
					</NavbarItem>
					<NavbarItem className={page >= maxPage ? 'disabled' : ''} title="Go to last" href="javascript:void(0);" onClick={() => paginate(maxPage, maxPage)}>
						<FontAwesomeIcon icon={['far', 'chevron-double-right']} />
					</NavbarItem>
					<NavbarItem>
						<Link to="/item/add"><FontAwesomeIcon icon="plus" /></Link>
					</NavbarItem>
					<NavbarItem hasDropdown isHoverable>
						<NavbarLink href="javascript:void(0);">
							<FontAwesomeIcon icon={_getViewIcon()} />
						</NavbarLink>
						<NavbarDropdown>
							{VIEWS.map(view => (
								<NavbarItem href="javascript:void(0);" onClick={() => changeView(view)} key={`view-${view}`}>
									{view === viewAs ? <b>{view}</b> : view}
								</NavbarItem>
							))}
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
							<NavbarItem href="javascript:void(0);" onClick={() => sortItems('ORDERED')}>
								{_displayCurrentSort('ORDERED')}
								&nbsp;Order
							</NavbarItem>
							<NavbarItem href="javascript:void(0);" onClick={() => sortItems('ITEMID')}>
								{_displayCurrentSort('ITEMID')}
								&nbsp;ID
							</NavbarItem>
							<NavbarItem href="javascript:void(0);" onClick={() => sortItems('ITEMNAME')}>
								{_displayCurrentSort('ITEMNAME')}
								&nbsp;Title
							</NavbarItem>
						</NavbarDropdown>
					</NavbarItem>
				</NavbarEnd>
			</NavbarMenu>
		</Navbar>
	);
};

export default Toolbar;

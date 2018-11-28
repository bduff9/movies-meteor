import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Input, Navbar, NavbarDropdown, NavbarEnd, NavbarItem, NavbarLink, NavbarMenu, NavbarStart } from 'bloomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './toolbar.css';

import { ITEMS_PER_PAGE } from '../../api/constants';

/**
 * @typedef {{
 *  data: {
 *    loading: boolean,
 *    countMovieItems: number,
 *  },
 *  page: number,
 *  savedViews?: import('../../api/models').SavedView[],
 *  selectedView?: string,
 *  sortBy: import('immutable').List<import('immutable').List<string>>,
 *  paginate: (newPage: number) => void,
 *  toggleFilters: (ev: React.MouseEvent<HTMLElement>) => void
 * }} Props
 */

/**
 * @type {React.StatelessComponent<Props>}
 */
const Toolbar = ({ data, page, savedViews = [], selectedView = '', sortBy, paginate, toggleFilters }) => {
	const { countMovieItems: totalCount, loading } = data;
	const maxPage = loading ? page + 1 : Math.ceil(totalCount / ITEMS_PER_PAGE);

	/**
	 * @param {number | string} newPage
	 */
	const _paginate = newPage => {
		if (typeof newPage === 'string') newPage = parseInt(newPage, 10);

		if (newPage === page) return;

		if (newPage < 1) return;

		if (newPage > maxPage) return;

		paginate(newPage);
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
					<NavbarItem className={page < 2 ? 'disabled' : ''} title="Go to first" href="javascript:void(0);" onClick={() => _paginate(1)}>
						<FontAwesomeIcon icon={['far', 'chevron-double-left']} />
					</NavbarItem>
					<NavbarItem className={page < 2 ? 'disabled' : ''} title="Go to previous" href="javascript:void(0);" onClick={() => _paginate(page - 1)}>
						<FontAwesomeIcon icon={['far', 'chevron-left']} />
					</NavbarItem>
					<NavbarItem title="Jump to...">
						<Input isSize="small" type="number" value={page} onChange={/** @param {React.FormEvent<HTMLInputElement>} ev */ev => _paginate(ev.currentTarget.value)} />
					</NavbarItem>
					<NavbarItem className={page >= maxPage ? 'disabled' : ''} title="Go to next" href="javascript:void(0);" onClick={() => _paginate(page + 1)}>
						<FontAwesomeIcon icon={['far', 'chevron-right']} />
					</NavbarItem>
					<NavbarItem className={page >= maxPage ? 'disabled' : ''} title="Go to last" href="javascript:void(0);" onClick={() => _paginate(maxPage)}>
						<FontAwesomeIcon icon={['far', 'chevron-double-right']} />
					</NavbarItem>
					<NavbarItem href="javascript:void(0);" onClick={() => console.log('clicked add')}>
						<FontAwesomeIcon icon="plus" />
					</NavbarItem>
					<NavbarItem hasDropdown isHoverable>
						<NavbarLink href="javascript:void(0);">
							<FontAwesomeIcon icon="th-large" />
						</NavbarLink>
						<NavbarDropdown>
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
};

const getCountOfItems = gql`
query GetCountOfItems {
	countMovieItems
}
`;

export default graphql(getCountOfItems, {
	options: {
		pollInterval: 10000,
	},
	// @ts-ignore
})(Toolbar);

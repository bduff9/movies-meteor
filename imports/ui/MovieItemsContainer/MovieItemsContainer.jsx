import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import './movie-items-container.css';

import { ITEMS_PER_PAGE } from '../../api/constants';
import Filters from '../Filters/Filters.jsx';
import MovieItemsDetail from '../MovieItemsDetail/MovieItemsDetail';
import MovieItemsGrid from '../MovieItemsGrid/MovieItemsGrid';
import MovieItemsList from '../MovieItemsList/MovieItemsList';
import Toolbar from '../Toolbar/Toolbar.jsx';

/**
 * @typedef {{
 *  data: {
 *    loading: boolean,
 *    countMovieItems: number,
 *    movieItems: import('../../api/models').MovieItem[],
 *  },
 * }} QueryResult
 */
/**
 * @typedef {{
 *  filterOpen: boolean,
 *  filters: import('immutable').Map<any, any>,
 *  limit: number,
 *  page: number,
 *  skip: number,
 *  sortBy: import('immutable').List<import('immutable').List<string>>,
 *  viewAs: string,
 *  changeView: (newView: string) => void,
 *  paginate: (newPage: number | string, maxPage: number) => void,
 *  sortItems: (col: string) => void,
 *  toggleFilters: (ev: React.MouseEvent<HTMLElement>) => void,
 *  updateFilters: (filters: import('immutable').Map<any, any>) => void,
 * }} Props
 */

/**
	* @param {Props & QueryResult} Props
	*/
const MovieItemsContainer = ({ data, filterOpen, filters, page, viewAs, updateFilters, ...rest }) => {
	const { countMovieItems, loading, movieItems } = data;
	const maxPage = loading ? page : Math.ceil(countMovieItems / ITEMS_PER_PAGE);

	return (
		<div>
			<Toolbar
				{...rest}
				maxPage={maxPage}
				page={page}
				viewAs={viewAs}
				key="toolbar" />
			{filterOpen && <Filters filters={filters} updateFilters={updateFilters} key="filters" />}
			{viewAs === 'Grid' && (
				<MovieItemsGrid
					isFilterOpen={filterOpen}
					loading={loading}
					movieItems={movieItems}
					key="movieItemsGrid" />
			)}
			{viewAs === 'List' && (
				<MovieItemsList
					isFilterOpen={filterOpen}
					loading={loading}
					movieItems={movieItems}
					key="movieItemsList" />
			)}
			{viewAs === 'Detail' && (
				<MovieItemsDetail
					isFilterOpen={filterOpen}
					loading={loading}
					movieItems={movieItems}
					key="movieItemsDetail" />
			)}
		</div>
	);
};

const allMovieItems = gql`
	query MovieItemsForDisplay ($filters: Object, $limit: Int, $skip: Int, $orderBy: [[String]]) {
		movieItems (filters: $filters, limit: $limit, skip: $skip, order: $orderBy) {
			id
			orderToWatch
			itemName
			caseType
			digitalType
			is3D
			isWatched
			formatType
			itemStatus
			releaseDate
			itemURL
			itemNotes
		}
		countMovieItems
	}
`;

/**
 * @typeof {MovieItemsContainer}
 */
export default graphql(allMovieItems, {
	/**
	 * @param {Props} props
	 */
	options: ({ filters, page, sortBy }) => ({
		pollInterval: 10000,
		variables: {
			filters,
			limit: ITEMS_PER_PAGE,
			skip: (page - 1) * ITEMS_PER_PAGE,
			orderBy: sortBy,
		},
	}),
	// @ts-ignore
})(MovieItemsContainer);

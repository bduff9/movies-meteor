import React, { Component } from 'react';

import './movie-items-container.css';

import MovieItems from '../MovieItems/MovieItems';

/**
 * @typedef {{
 *  filters: import('immutable').Map<any, any>,
 *  limit: number,
 *  skip: number,
 *  sortBy: import('immutable').List<import('immutable').List<string>>,
 *  selectMovieItem: (id: number?) => void,
 * }} Props
 */

/**
	* @extends {Component<Props>}
	*/
class MovieItemsContainer extends Component {

	/**
	 * @param {Props} nextProps
	 */
	shouldComponentUpdate (nextProps) {
		const { filters, limit, skip, sortBy } = this.props;

		if (limit !== nextProps.limit || skip !== nextProps.skip) return true;

		if (sortBy !== nextProps.sortBy) return true;

		if (filters !== nextProps.filters) return true;

		return false;
	}

	render () {
		return <MovieItems {...this.props} />;
	}
}

export default MovieItemsContainer;

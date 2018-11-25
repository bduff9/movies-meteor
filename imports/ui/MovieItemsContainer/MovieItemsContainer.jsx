import React, { Component } from 'react';

import './movie-items-container.css';

import MovieItems from '../MovieItems/MovieItems';

/**
 * @typedef {{
 *  filters: import('immutable').Map<any, any>,
 *  sortBy: import('immutable').List<string>,
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
		const { filters, sortBy } = this.props;

		if (sortBy !== nextProps.sortBy) return true;

		if (filters !== nextProps.filters) return true;

		return false;
	}

	render () {
		return <MovieItems {...this.props} />;
	}
}

export default MovieItemsContainer;

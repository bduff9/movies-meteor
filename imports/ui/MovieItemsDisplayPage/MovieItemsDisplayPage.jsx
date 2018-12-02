import React, { Component } from 'react';
import { List, Map } from 'immutable';

import './movie-items-display-page.css';

import { VIEWS } from '../../api/constants';
import MovieItemsContainer from '../MovieItemsContainer/MovieItemsContainer.jsx';

/**
 * @typedef {{
 *  filters: import('immutable').Map<any, any>,
 *  limit: number,
 *  skip: number,
 *  sortBy: import('immutable').List<import('immutable').List<string>>,
 * }} Props
 */

/**
 * @typedef {typeof initialState} State
 */
const initialState = {
	filterOpen: false,
	filters: Map(),
	page: 1,
	sortBy: List([ List(['ITEMID', 'ASC']) ]),
	viewAs: 'Grid',
};

/**
 * @extends {Component<Props, State>}
 */
class MovieItemList extends Component {

	state = initialState;

	/**
	 * @param {string} newView
	 */
	_changeView = newView => {
		if (VIEWS.indexOf(newView) === -1) return;

		this.setState({ viewAs: newView });
	};

	/**
	 * @param {number | string} newPage
	 * @param {number} maxPage
	 */
	_paginate = (newPage, maxPage) => {
		const { page } = this.state;

		if (typeof newPage === 'string') newPage = parseInt(newPage, 10);

		if (newPage < 1 || newPage === page || newPage > maxPage) return;

		this.setState({ page: newPage });
	}

	/**
	 * @param {string} col
	 */
	_sortItems = col => {
		const { sortBy } = this.state;
		const colArr = sortBy.get(0);
		let newColArr;

		if (colArr.get(0) === col) {
			newColArr = colArr.set(1, (colArr.get(1) === 'ASC' ? 'DESC' : 'ASC'));
		} else {
			newColArr = List([col, 'ASC']);
		}

		this.setState({ sortBy: List([ newColArr ]) });
	}

	_toggleFilters = () => {
		this.setState(prevState => ({ filterOpen: !prevState.filterOpen }));
	}

	render () {
		const { filterOpen, filters, page, sortBy, viewAs } = this.state;

		return (
			<MovieItemsContainer
				filterOpen={filterOpen}
				filters={filters}
				page={page}
				sortBy={sortBy}
				viewAs={viewAs}
				changeView={this._changeView}
				paginate={this._paginate}
				sortItems={this._sortItems}
				toggleFilters={this._toggleFilters}
				key="movie-items-container" />
		);
	}
}

export default MovieItemList;

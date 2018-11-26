import React, { Component } from 'react';
import { List, Map } from 'immutable';

import './app.css';

import EditMovieItem from '../EditMovieItem/EditMovieItem.jsx';
import Filters from '../Filters/Filters.jsx';
import Header from '../Header/Header.jsx';
import MovieItemsContainer from '../MovieItemsContainer/MovieItemsContainer.jsx';
import Toolbar from '../Toolbar/Toolbar.jsx';

const ITEMS_PER_PAGE = 25;

/**
 * @typedef {{}} Props
 */

/**
 * @typedef {typeof initialState} State
 */

const initialState = {
	currentMovieItem: /** @type {number?} */ (null),
	filterOpen: false,
	filters: Map(),
	page: 1,
	sortBy: List([ List(['ITEMID', 'ASC']) ]),
};

/**
 * @extends {Component<Props, State>}
 */
class App extends Component {

	state = initialState;

	/**
	 * @param {number} direction
	 */
	_paginate = direction => {
		const { page } = this.state;

		if (page <= 1 && direction === -1) return;

		if (direction !== -1 && direction !== 1) return; //TODO: get max and implement max check

		this.setState(({ page }) => ({ page: page + direction }));
	}

	/**
	 * @param {number?} newMovieItem
	 */
	_selectMovieItem = newMovieItem => {
		this.setState({ currentMovieItem: newMovieItem });
	}

	_toggleFilters = () => {
		this.setState(prevState => ({ filterOpen: !prevState.filterOpen }));
	}

	render () {
		const { currentMovieItem, filterOpen, filters, page, sortBy } = this.state;

		return (
			<div className="full-coverage">
				<Header />
				{currentMovieItem === null ? [
					<Toolbar sortBy={sortBy} paginate={this._paginate} toggleFilters={this._toggleFilters} key="toolbar" />,
					(filterOpen && <Filters filters={filters} key="filters" />),
					<MovieItemsContainer
						filters={filters}
						limit={ITEMS_PER_PAGE}
						skip={(page - 1) * ITEMS_PER_PAGE}
						sortBy={sortBy}
						selectMovieItem={this._selectMovieItem} key="movie-items-container" />,
				]
					:
					(
						<EditMovieItem itemID={currentMovieItem} selectMovieItem={this._selectMovieItem} />
					)}
			</div>
		);
	}

}

export default App;

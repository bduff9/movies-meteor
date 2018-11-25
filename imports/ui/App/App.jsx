import React, { Component } from 'react';
import { List, Map } from 'immutable';

import './app.css';

import EditMovieItem from '../EditMovieItem/EditMovieItem.jsx';
import Filters from '../Filters/Filters.jsx';
import Header from '../Header/Header.jsx';
import MovieItemsContainer from '../MovieItemsContainer/MovieItemsContainer.jsx';
import Toolbar from '../Toolbar/Toolbar.jsx';

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
	sortBy: List(['ITEMID', 'ASC']),
};

/**
 * @extends {Component<Props, State>}
 */
class App extends Component {

	state = initialState;

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
		const { currentMovieItem, filterOpen, filters, sortBy } = this.state;

		return (
			<div className="full-coverage">
				<Header />
				{currentMovieItem === null ? [
					<Toolbar sortBy={sortBy} toggleFilters={this._toggleFilters} key="toolbar" />,
					(filterOpen && <Filters filters={filters} key="filters" />),
					<MovieItemsContainer filters={filters} sortBy={sortBy} selectMovieItem={this._selectMovieItem} key="movie-items-container" />,
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

'use strict';

import React, { Component } from 'react';
import { List, Map } from 'immutable';

import EditMovieItem from './EditMovieItem';
import Filters from './Filters';
import Header from './Header';
import MovieItemsContainer from './MovieItemsContainer';
import Toolbar from './Toolbar';

class App extends Component {
	constructor (props) {
		super(props);

		this.state = {
			currentMovieItem: null,
			filterOpen: false,
			filters: Map(),
			sortBy: List(['ITEMID', 'ASC']),
		};
	}

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

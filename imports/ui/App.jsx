'use strict';

import React, { Component } from 'react';
import { List, Map } from 'immutable';

import Filters from './Filters';
import Header from './Header';
import MovieItemsContainer from './MovieItemsContainer';
import Toolbar from './Toolbar';

class App extends Component {
	constructor (props) {
		super(props);

		this.state = {
			sortBy: List(['ITEMID', 'ASC']),
			filterOpen: false,
			filters: Map()
		};

		this._toggleFilters = this._toggleFilters.bind(this);
	}

	_toggleFilters () {
		this.setState(prevState => ({ filterOpen: !prevState.filterOpen }));
	}

	render () {
		const { filterOpen, filters, sortBy } = this.state;

		return (
			<div className="full-coverage">
				<Header />
				<Toolbar sortBy={sortBy} toggleFilters={this._toggleFilters} />
				{filterOpen ? <Filters filters={filters} /> : null}
				<MovieItemsContainer filters={filters} sortBy={sortBy} />
			</div>
		);
	}
}

export default App;

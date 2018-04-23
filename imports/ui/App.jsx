'use strict';

import React, { Component } from 'react';

import Header from './Header';
import MovieItemsContainer from './MovieItemsContainer';

class App extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div className="full-coverage">
				<Header />
				<MovieItemsContainer />
			</div>
		);
	}
}

export default App;

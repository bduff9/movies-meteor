'use strict';

import React, { Component } from 'react';
import MovieItemsContainer from './MovieItemsContainer';

class App extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		return <MovieItemsContainer />;
	}
}

export default App;

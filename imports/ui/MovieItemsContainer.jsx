'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

import MovieItems from './MovieItems';

class MovieItemsContainer extends Component {
	constructor (props) {
		super(props);

		this.state = {};
	}

	shouldComponentUpdate (nextProps, nextState) {
		const { filters, sortBy } = this.props;

		if (sortBy !== nextProps.sortBy) return true;

		if (filters !== nextProps.filters) return true;

		return false;
	}

	render () {
		return <MovieItems {...this.props} />;
	}
}

MovieItemsContainer.propTypes = {
	filters: PropTypes.instanceOf(Map).isRequired,
	sortBy: PropTypes.instanceOf(List).isRequired,
	selectMovieItem: PropTypes.func.isRequired,
};

export default MovieItemsContainer;

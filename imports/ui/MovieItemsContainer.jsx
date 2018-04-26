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
		const { filters, sortBy } = this.props;

		return (
			<MovieItems filters={filters} sortBy={sortBy} />
		);
	}
}

MovieItemsContainer.propTypes = {
	filters: PropTypes.instanceOf(Map).isRequired,
	sortBy: PropTypes.instanceOf(List).isRequired,
};

export default MovieItemsContainer;

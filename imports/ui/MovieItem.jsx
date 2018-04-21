'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MovieItem extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		const { movieItem } = this.props;

		return (
			<div>{movieItem.itemName}</div>
		);
	}
}

MovieItem.propTypes = {
	movieItem: PropTypes.object.isRequired
};

export default MovieItem;

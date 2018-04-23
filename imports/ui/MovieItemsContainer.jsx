'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Column, Columns, Container } from 'bloomer';
import Icon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-pro-solid/faSpinner';

import MovieItem from './MovieItem';

class MovieItems extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		const { data } = this.props;
		const { loading, movieItems } = data;

		return (
			<Container isFluid>
				<Columns isGrid isMultiline>
					{loading ? (
						<Column isSize="full">
							<Icon icon={faSpinner} spin />
								&nbsp; Loading...
						</Column>
					)
						:
						movieItems && movieItems.map(movieItem => <MovieItem movieItem={movieItem} key={`movie-item-${movieItem.itemID}`} />)}
				</Columns>
			</Container>
		);
	}
}

MovieItems.propTypes = {
	data: PropTypes.shape({
		movieItems: PropTypes.array
	}).isRequired
};

const allMovieItems = gql`
	query MovieItemsForDisplay {
		movieItems {
			itemID
			orderToWatch
			itemName
			caseType
			digitalType
			is3D
			isWatched
			formatType
			itemStatus
			releaseDate
			itemURL
			itemNotes
		}
	}
`;

const MovieItemsContainer = graphql(allMovieItems, {
	options: {
		pollInterval: 10000
	}
})(MovieItems);

export default MovieItemsContainer;

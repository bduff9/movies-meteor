'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Column, Columns } from 'bloomer';
import Icon from '@fortawesome/react-fontawesome';
import fasSpinner from '@fortawesome/fontawesome-pro-solid/faSpinner';

import MovieItem from './MovieItem';
import MovieItemGridContainer from './MovieItemGridContainer';

class MovieItems extends Component {
	constructor (props) {
		super(props);

		this.state = {
			view: 'grid',
		};
	}

	render () {
		const { view } = this.state;
		const { data, selectMovieItem } = this.props;
		const { loading, movieItems } = data;

		if (view === 'grid') {
			return (
				<MovieItemGridContainer isFluid>
					<Columns isGrid isMultiline>
						{loading ? (
							<Column isSize="full">
								<Icon icon={fasSpinner} spin />
							&nbsp; Loading...
							</Column>
						)
							:
							movieItems && movieItems.map(movieItem => <MovieItem movieItem={movieItem} view={view} selectMovieItem={selectMovieItem} key={`movie-item-${movieItem.id}`} />)}
					</Columns>
				</MovieItemGridContainer>
			);
		}

		return null;
	}
}

MovieItems.propTypes = {
	data: PropTypes.shape({
		loading: PropTypes.bool.isRequired,
		movieItems: PropTypes.array,
	}).isRequired,
	filters: PropTypes.instanceOf(Map).isRequired,
	sortBy: PropTypes.instanceOf(List).isRequired,
	selectMovieItem: PropTypes.func.isRequired,
};

const allMovieItems = gql`
	query MovieItemsForDisplay {
		movieItems {
			id
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

export default graphql(allMovieItems, {
	options: {
		pollInterval: 10000,
	},
})(MovieItems);

import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Column, Columns } from 'bloomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './movie-items.css';

import MovieItem from '../MovieItem/MovieItem';
import MovieItemGridContainer from '../styled-components/MovieItemGridContainer';

/**
 * @typedef {{
 *  data: {
 *    loading: boolean,
 *    movieItems: import('../../api/models').MovieItem[],
 *  },
 *  filters: import('immutable').Map<any, any>,
 *  sortBy: import('immutable').List<string>,
 *  selectMovieItem: (id: number?) => void,
 * }} Props
 */

/**
 * @typedef {typeof initialState} State
 */

const initialState = {
	view: 'grid',
};

/**
 * @extends {Component<Props, State>}
 */
class MovieItems extends Component {

	state = initialState;

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
								<FontAwesomeIcon icon="spinner" spin />
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

/**
 * @constructs {React.StatelessComponent<Props>}
 */
export default graphql(allMovieItems, {
	options: {
		pollInterval: 10000,
	},
	// @ts-ignore
})(MovieItems);

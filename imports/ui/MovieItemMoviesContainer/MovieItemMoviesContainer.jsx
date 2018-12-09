import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Button, Column, Heading } from 'bloomer';

import './movie-item-movies-container.css';

import Loading from '../Loading/Loading';

/**
 * @typedef {{
 *  data: {
 *    loading: boolean,
 *    movies: import('../../api/models').Movie[],
 *  },
 *  movieItemID: number,
 * }} Props
 */

/**
 * @type {React.StatelessComponent<Props>}
 */
const MovieItemMoviesContainer = ({ data }) => {
	const { loading, movies } = data;

	return (
		<Column>
			{loading ?
				<Loading />
				:
				<Fragment>
					{/*TODO: Create component to show/hide based on count > 0 */}
					<Heading>Movies</Heading>
					{movies && movies.length ?
						<Fragment>
							<br />
							{JSON.stringify(movies)}
						</Fragment>
						:
						<small>No movies found</small>
					}
					<br />
					<Button isColor="primary" onClick={() => { console.warn('TODO: add "add" logic'); }}>Add Movie</Button>
				</Fragment>
			}
		</Column>
	);
};

const moviesByMovieItemID = gql`
	query MoviesByMovieItemID ($movieItemID: Int) {
		movies (itemID: $movieItemID) {
			id
			itemID
			movieTitle
			movieURL
		}
	}
`;

/**
 * @typeof {MovieItemMoviesContainer}
 */
export default graphql(moviesByMovieItemID, {
	/**
	 * @param {{ movieItemID: number }} props
	 */
	options: ({ movieItemID }) => ({
		variables: {
			movieItemID,
		},
	}),
	// @ts-ignore
})(MovieItemMoviesContainer);

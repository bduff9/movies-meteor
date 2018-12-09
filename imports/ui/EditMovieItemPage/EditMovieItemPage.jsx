import React from 'react';
import gql from 'graphql-tag';
import { graphql, Mutation } from 'react-apollo';
import { Column, Columns, Container } from 'bloomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './edit-movie-item-page.css';

import MovieItemForm from '../MovieItemForm/MovieItemForm';
import MovieItemMoviesContainer from '../MovieItemMoviesContainer/MovieItemMoviesContainer';

/**
 * @typedef {{
 *  history: object,
 *  match: object,
 * }} Router
 */

/**
 * @typedef {{
 *  data: {
 *    loading: boolean,
 *    movieItem: import('../../api/models').MovieItem,
 *  }
 * }} Props
 */

/**
 * @type {React.StatelessComponent<Props & Router>}
 */
const EditMovieItemPage = ({ data, history }) => {
	const { loading, movieItem } = data;

	return (
		<Container isFluid>
			<Columns isCentered isGrid isVCentered>
				{loading ?
					<Column>
						<FontAwesomeIcon icon="spinner" spin />
					&nbsp; Loading...
					</Column>
					:
					<Column>
						<Mutation mutation={editMovieItem} refetchQueries={['MovieItemsForDisplay']} awaitRefetchQueries>
							{(editMovie, { loading, error }) => (
								<React.Fragment>
									<MovieItemForm movieItem={movieItem} onSubmit={(movieItem, extra) => editMovie({ variables: movieItem }).then(() => history.push('/'))} />
									{loading ? <div>Saving...</div> : error && <div>{error}</div>}
								</React.Fragment>
							)}
						</Mutation>
						{movieItem.id != null && <MovieItemMoviesContainer movieItemID={movieItem.id} />}
					</Column>
				}
			</Columns>
		</Container>
	);
};

const editMovieItem = gql`
mutation UpdateMovieItem (
	$id: Int!,
	$orderToWatch: Int,
	$itemName: String,
	$caseType: CaseType,
	$digitalType: DigitalType,
	$is3D: YesNo,
	$isWatched: YesNo,
	$formatType: FormatType,
	$itemStatus: StatusType,
	$releaseDate: String,
	$itemURL: String,
	$itemNotes: String
) {
	updateMovieItem (
		id: $id,
		orderToWatch: $orderToWatch,
		itemName: $itemName,
		caseType: $caseType,
		digitalType: $digitalType,
		is3D: $is3D,
		isWatched: $isWatched,
		formatType: $formatType,
		itemStatus: $itemStatus,
		releaseDate: $releaseDate,
		itemURL: $itemURL,
		itemNotes: $itemNotes
	) {
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
		__typename
	}
}
`;

const movieItemByID = gql`
	query MovieItemToEdit ($itemID: Int) {
		movieItem (itemID: $itemID) {
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
 * @typeof {EditMovieItemPage}
 */
export default graphql(movieItemByID, {
	/**
	 * @param {Router} router
	 */
	options: ({ match }) => ({
		variables: {
			itemID: match.params.itemID,
		},
	}),
	// @ts-ignore
})(EditMovieItemPage);

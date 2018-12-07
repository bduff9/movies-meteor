import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Column, Columns, Container } from 'bloomer';

import './add-movie-item-page.css';

import { MovieItem } from '../../api/models';
import MovieItemForm from '../MovieItemForm/MovieItemForm';

/**
 * @typedef {{
 *  history: object,
 * }} Router
 */

/**
 * @typedef {{}} Props
 */

/**
 * @type {React.StatelessComponent<Props & Router>}
 */
const AddMovieItemPage = ({ history }) => (
	<Container isFluid>
		<Columns isCentered isGrid isVCentered>
			<Column>
				<Mutation mutation={addMovieItem}>
					{(addMovie, { loading, error }) => (
						<React.Fragment>
							<MovieItemForm movieItem={MovieItem()} onSubmit={(movieItem, extra) => addMovie({ variables: movieItem }).then(() => history.push('/'))} />
							{loading ? <div>Saving...</div> : error && <div>{error}</div>}
						</React.Fragment>
					)}
				</Mutation>
			</Column>
		</Columns>
	</Container>
);

const addMovieItem = gql`
mutation AddMovieItem (
	$itemName: String!,
	$caseType: CaseType,
	$digitalType: DigitalType,
	$is3D: YesNo,
	$isWatched: YesNo,
	$formatType: FormatType,
	$itemStatus: StatusType,
	$releaseDate: String!,
	$itemURL: String!,
	$itemNotes: String
) {
	addMovieItem (
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

export default AddMovieItemPage;

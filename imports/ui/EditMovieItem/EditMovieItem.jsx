import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Button } from 'bloomer';

import './edit-movie-item.css';

/**
 * @typedef {{
 *  data: {
 *    loading: boolean,
 *    movieItem: import('../../api/models').MovieItem,
 *  },
 *  itemID: number,
 *  selectMovieItem: (id: number?) => void,
 * }} Props
 */

/**
 * @type {React.StatelessComponent<Props>}
 */
const EditMovieItem = ({ data, selectMovieItem }) => {
	const { loading, movieItem } = data;

	const deselectMovieItem = () => {
		selectMovieItem(null);
	};

	return (
		<div>
			{loading ?
				<div>Loading...</div>
				:
				<div>
					{JSON.stringify(movieItem)}
					<Button isColor="primary" onClick={deselectMovieItem}>Return</Button>
				</div>
			}
		</div>
	);
};

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
 * @constructs {React.StatelessComponent<Props>}
 */
export default graphql(movieItemByID, {
	/**
	 * @param {Props} props
	 */
	options: ({ itemID }) => ({
		variables: {
			itemID,
		},
	}),
	// @ts-ignore
})(EditMovieItem);

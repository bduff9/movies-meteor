import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CardFooterItem } from 'bloomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './toggle-movie-item-watched.css';

const toggleWatched = gql`
mutation markMovieWatched($id: Int!, $isWatched: String!) {
	markMovieWatched(id: $id, isWatched: $isWatched) {
		id
		__typename
		isWatched
	}
}
`;

/**
 * @typedef {{ isWatched: boolean, itemID: number }} Props
 */

/**
 * @type {React.StatelessComponent<Props>}
 */
const ToggleMovieItemWatched = ({ isWatched, itemID }) => {
	let newWatched = 'N';
	let text = 'Watched';
	/** @type {string | undefined} */
	let textColor = 'success';

	if (!isWatched) {
		newWatched = 'Y';
		text = 'Mark Watched';
		textColor = undefined;
	}

	return (
		<Mutation mutation={toggleWatched}>
			{(mutate, { loading, error }) => (
				<CardFooterItem
					hasTextColor={textColor}
					href="javascript:void(0);"
					onClick={ev => {
						mutate({
							/**
							 * The below will optimistically update UI, commented out currently as with lag, the screen looks better with no optimistic UI
							 * i.e. with it, the screen hangs for a second, then briefly shows loading followed by updated status.
							 * Without it, the loading immediately shows until the response from the server updates the item's status.
							 * Leaving here for demonstration only until we figure out infinite loading
							 */
							optimisticResponse: {
								__typename: 'Mutation',
								markMovieWatched: {
									id: itemID,
									__typename: 'MovieItem',
									isWatched: newWatched,
								},
							},
							variables: {
								id: itemID,
								isWatched: newWatched,
							},
						});
					}}>
					{loading ? <FontAwesomeIcon icon="spinner" spin /> : error ? 'Error!' : text}
				</CardFooterItem>
			)}
		</Mutation>
	);
};

export default ToggleMovieItemWatched;

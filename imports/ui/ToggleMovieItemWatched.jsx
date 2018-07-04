'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CardFooterItem } from 'bloomer';
import Icon from '@fortawesome/react-fontawesome';
import fasSpinner from '@fortawesome/fontawesome-pro-solid/faSpinner';

const toggleWatched = gql`
mutation markMovieWatched($id: Int!, $isWatched: String!) {
	markMovieWatched(id: $id, isWatched: $isWatched) {
		id
		__typename
		isWatched
	}
}
`;

/** @type {React.StatelessComponent} */
const ToggleMovieItemWatched = ({ isWatched, itemID }) => {
	let newWatched = 'N';
	let text = 'Watched';
	/** @type {any} */
	let textColor = 'success';

	if (!isWatched) {
		newWatched = 'Y';
		text = 'Mark Watched';
		textColor = null;
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
							 optimisticResponse: {
								__typename: 'Mutation',
								markMovieWatched: {
									id: itemID,
									__typename: 'MovieItem',
									isWatched: newWatched,
								},
							},*/
							variables: {
								id: itemID,
								isWatched: newWatched,
							},
						});
					}}>
					{loading ? <Icon icon={fasSpinner} spin /> : error ? 'Error!' : text}
				</CardFooterItem>
			)}
		</Mutation>
	);
};

ToggleMovieItemWatched.propTypes = {
	isWatched: PropTypes.bool.isRequired,
	itemID: PropTypes.number.isRequired,
};

export default ToggleMovieItemWatched;

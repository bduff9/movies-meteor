import React from 'react';

import './edit-movie-item.css';

/**
 * @typedef {{
 *  itemID: number,
 *  selectMovieItem: (id: number?) => void,
 * }} Props
 */

/**
 * @type {React.StatelessComponent<Props>}
 */
const EditMovieItem = ({ itemID, selectMovieItem }) => {
	const deselectMovieItem = () => {
		selectMovieItem(null);
	};

	return (
		<div>
			{itemID}
			<button type="button" onClick={deselectMovieItem}>Return</button>
		</div>
	);
};

export default EditMovieItem;

'use strict';

import React from 'react';
import PropTypes from 'prop-types';

/** @type {React.StatelessComponent} */
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

EditMovieItem.propTypes = {
	itemID: PropTypes.number.isRequired,
	selectMovieItem: PropTypes.func.isRequired,
};

export default EditMovieItem;

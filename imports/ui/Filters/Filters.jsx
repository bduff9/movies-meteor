import React from 'react';
import { Box } from 'bloomer';

import './filters.css';

/**
 * @typedef {{
 *  filters: import('immutable').Map<any, any>
 * }} Props
 */

/**
 * @type {React.StatelessComponent<Props>}
 */
const Filters = ({ filters }) => {
	const UUitemID = filters.get('itemID');

	return (
		<Box>TODO: filters</Box>
	);
};

export default Filters;

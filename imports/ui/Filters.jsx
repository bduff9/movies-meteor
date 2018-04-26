'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Box } from 'bloomer';

/** @type {React.StatelessComponent} */
const Filters = ({ filters }) => {
	const { itemID } = filters;

	return (
		<Box>TODO: filters</Box>
	);
};

Filters.propTypes = {
	filters: PropTypes.instanceOf(Map).isRequired
};

export default Filters;

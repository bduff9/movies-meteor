import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './loading.css';

const Loading = () => (
	<Fragment>
		<FontAwesomeIcon icon="spinner" spin />
		&nbsp; Loading...
	</Fragment>
);

export default Loading;

import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthConsumer } from './auth.service';

const UnauthenticatedRoute = (props) => (
	<AuthConsumer>
		{({ isSignedIn }) => (
			isSignedIn
				? <Redirect to="/" />
				: <Route {...props}/>
		)}
	</AuthConsumer>
);

export default UnauthenticatedRoute;

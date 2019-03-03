import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthConsumer } from './auth.service';

const AuthenticatedRoute = (props) => (
	<AuthConsumer>
		{({ isSignedIn }) => (
			isSignedIn
				? <Route {...props} />
				: <Redirect to="/login" />
		)}
	</AuthConsumer>
);

export default AuthenticatedRoute;

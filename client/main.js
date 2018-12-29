import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import { ApolloProvider } from 'react-apollo';

import App from '../imports/ui/App/App.jsx';
import client from '../imports/startup/client/apollo';
import '../imports/startup/client';

Meteor.startup(() => {
	render(<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>, document.getElementById('app'));
});

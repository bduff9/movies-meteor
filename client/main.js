import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMoneyBillAlt as farMoneyBillAlt} from '@fortawesome/free-regular-svg-icons';
import { faBook as farBook, faClipboard as farClipboard, faSquare as farSquare } from '@fortawesome/pro-regular-svg-icons';
import { faBook, faBox, faCheck, faPlus, faSearch, faSort, faSpinner, faSquare, faThLarge, faTruck } from '@fortawesome/pro-solid-svg-icons';
import ApolloClient from 'apollo-client';
// @ts-ignore
import { createApolloClient } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';

import App from '../imports/ui/App';

const client = new ApolloClient(createApolloClient());

library.add(faBook, farBook, faBox, faCheck, farClipboard, farMoneyBillAlt, faPlus, faSearch, faSort, faSpinner, faSquare, farSquare, faThLarge, faTruck);

Meteor.startup(() => {
	render(<ApolloProvider client={client}>
		<App />
	</ApolloProvider>, document.getElementById('app'));
});

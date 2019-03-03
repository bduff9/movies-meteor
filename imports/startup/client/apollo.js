import ApolloClient from 'apollo-boost';
import { Auth } from 'aws-amplify';

const uri = '/graphql';

/**
 * @param {string} uri
 * @param {*} options
 */
const tokenFetch = (uri, options) => {
	return Auth.currentSession()
		.then(session => {
			options.headers.accessToken = session.getAccessToken().getJwtToken();
			options.headers.idToken = session.getIdToken().getJwtToken();
			options.headers.refreshToken = session.getRefreshToken().getToken();

			return fetch(uri, options);
		})
		.catch(error => console.error('App session error', error));
};

const client = new ApolloClient({
	uri,
	fetch: tokenFetch,
});

export default client;

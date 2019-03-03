import { ApolloServer } from 'apollo-server-express';
import { WebApp } from 'meteor/webapp';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

// @ts-ignore
import typeDefs from '../../api/schema.graphql';
import resolvers from '../../api/resolvers';
import jwk from './jwk';

const pem = jwkToPem(jwk.keys[0]);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const { idtoken } = req.headers;
		const user = idtoken && jwt.verify(idtoken, pem);

		if (!user) throw new Error('You must be logged in');

		return { user };
	},
});

server.applyMiddleware({
	app: WebApp.connectHandlers,
	path: '/graphql',
});

WebApp.connectHandlers.use('/graphql', (req, res) => {
	if (req.method === 'GET') res.end();
});

import { ApolloServer } from 'apollo-server-express';
// @ts-ignore
import { getUser } from 'meteor/apollo';
import { WebApp } from 'meteor/webapp';
import typeDefs from '../../api/schema.graphql';
import resolvers from '../../api/resolvers';

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => ({
		user: await getUser(req.headers.authorization),
	}),
});

server.applyMiddleware({
	app: WebApp.connectHandlers,
	path: '/graphql',
});

WebApp.connectHandlers.use('/graphql', (req, res) => {
	if (req.method === 'GET') res.end();
});

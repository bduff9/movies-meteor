'use strict';

// @ts-ignore
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../imports/api/schema';
import resolvers from '../imports/api/resolvers';

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
	allowUndefinedInResolve: false,
	logger: { log: err => console.error('GraphQL Custom Logger', err) },
});

createApolloServer({
	schema,
});

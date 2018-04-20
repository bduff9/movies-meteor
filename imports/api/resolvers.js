'use strict';

import { MovieItem, Movie } from './connectors';

const resolvers = {
	Query: {
		movies (_, args) {
			return Movie.findAll({ where: args });
		},

		movieItems (_, args) {
			return MovieItem.findAll({ where: args });
		}
	}
};

export default resolvers;

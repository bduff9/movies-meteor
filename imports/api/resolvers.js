'use strict';

import { MovieItem, Movie } from './connectors';

const resolvers = {
	MovieItem: {
		digitalType ({ digitalType }) {
			if (digitalType === 'DC+UV') return 'DCUV';

			return digitalType;
		},

		formatType ({ formatType }) {
			if (formatType === 'Blu-ray') return 'BluRay';

			if (formatType === 'Ultra HD') return 'UltraHD';

			return formatType;
		},
	},

	Query: {
		movies (_, args) {
			return Movie.findAll({ where: args });
		},

		movieItems (_, args) {
			return MovieItem.findAll({ where: args });
		},
	},

	Mutation: {
		addMovieItem (_, args) {
			return MovieItem.create(args);
		},

		markMovieWatched (_, { itemID }) {
			return MovieItem.findById(itemID)
				.then(movieItem => {
					movieItem.orderToWatch = null;
					movieItem.isWatched = 'Y';

					return movieItem.save();
				});
		},

		updateMovieItem (_, { itemID, ...values }) {
			return MovieItem.update(values, { where: { itemID }, individualHooks: true })
				.then(([count, rows]) => {
					if (count === 0) return null;

					if (count > 1) console.warn(`Expected 1 row to change, instead ${count} rows changed`);

					return rows[0];
				});
		},

		addMovie (_, args) {
			return Movie.create(args);
		},

		updateMovie (_, args) {
			return Movie.update(args);
		},
	},
};

export default resolvers;

import { MovieItem, Movie } from './connectors';

/**
 * @type {import('graphql-tools').IResolvers<any, any>} resolvers
 */
const resolvers = {
	MovieItem: {
		/**
		 * @param {{ digitalType: string }} arg0
		 */
		digitalType ({ digitalType }) {
			if (digitalType === 'DC+UV') return 'DCUV';

			return digitalType;
		},

		/**
		 * @param {{ formatType: string }} arg0
		 */
		formatType ({ formatType }) {
			if (formatType === 'Blu-ray') return 'BluRay';

			if (formatType === 'Ultra HD') return 'UltraHD';

			return formatType;
		},
	},

	Query: {
		/**
		 * @param {object} _
		 * @param {object} args
		 */
		countMovies (_, args) {
			return Movie.count();
		},

		/**
		 * @param {object} _
		 * @param {object} args
		 */
		movies (_, args) {
			return Movie.findAll({ where: args });
		},

		/**
		 * @param {object} _
		 * @param {object} args
		 */
		countMovieItems (_, args) {
			return MovieItem.count();
		},

		/**
		 * @param {object} _
		 * @param {object} args
		 */
		movieItems (_, { limit, skip: offset, order, ...args }) {
			return MovieItem.findAll({
				limit,
				offset,
				order,
				where: args,
			});
		},

		/**
		 * @param {object} _
		 * @param {object} args
		 */
		movieItem (_, { itemID }) {
			return MovieItem.findByPk(itemID);
		},
	},

	/**
	 * @type {object} Mutation
	 */
	Mutation: {
		/**
		 * @param {object} _
		 * @param {object} args
		 */
		addMovieItem (_, args) {
			return MovieItem.create(args);
		},

		/**
		 * @param {object} _
		 * @param {{ id: number, isWatched?: string }} args
		 */
		markMovieWatched (_, { id, isWatched }) {
			return MovieItem.findById(id)
				.then(movieItem => {
					movieItem.orderToWatch = null;
					movieItem.isWatched = isWatched || 'Y';

					return movieItem.save();
				});
		},

		/**
		 * @param {object} _
		 * @param {{ id: number, values: object }} args
		 */
		updateMovieItem (_, { id, ...values }) {
			return MovieItem.update(values, { where: { id }, individualHooks: true })
				.then(([count, rows]) => {
					if (count === 0) return null;

					if (count > 1) console.warn(`Expected 1 row to change, instead ${count} rows changed`);

					return rows[0];
				});
		},

		/**
		 * @param {object} _
		 * @param {object} args
		 */
		addMovie (_, args) {
			return Movie.create(args);
		},

		/**
		 * @param {object} _
		 * @param {object} args
		 */
		updateMovie (_, args) {
			return Movie.update(args);
		},
	},
};

export default resolvers;

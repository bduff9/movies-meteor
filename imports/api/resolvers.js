import { Op } from 'sequelize';

import { MovieItem, Movie } from './connectors';
import { DIGITAL_TYPES, FORMAT_TYPES } from './constants';
import { ObjectScalarType } from './schema';

/**
 * @type {import('graphql-tools').IResolvers<any, any>} resolvers
 */
const resolvers = {
	DigitalType: DIGITAL_TYPES,
	FormatType: FORMAT_TYPES,
	Object: ObjectScalarType,

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
		movieItems (_, { filters, limit, skip: offset, order }) {
			return MovieItem.findAll({
				limit,
				offset,
				order,
				where: parseToWhereClause(filters),
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
			return MovieItem.findByPk(id)
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

/**
 * @param {Object} obj
 * @returns {Object}
 */
const parseToWhereClause = obj => {
	if (!obj) return undefined;

	/**
	 * @type {Object} whereObj
	 */
	const whereObj = {};

	Object.keys(obj).forEach(field => {
		/**
		 * @type {{ operator: String, value: String }} filter
		 */
		const { operator, value } = obj[field];
		/**
		 * @type {symbol} op
		 */
		const op = Op[operator];

		whereObj[field] = { [op]: value };
	});

	return whereObj;
};

export default resolvers;

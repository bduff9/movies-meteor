import { Meteor } from 'meteor/meteor';
import Sequelize from 'sequelize';

import { ITEM_CASES, ITEM_DIGITAL_TYPES, ITEM_FORMATS, ITEM_STATUSES, YES_NO } from './constants';

const { userName, password, url: host, port } = Meteor.settings.private.database;

// Create the connection
const db = new Sequelize('media_tracker', userName, password, {
	host,
	port,
	dialect: 'mysql',
	operatorsAliases: false,
});

// Define the models
const MovieItemModel = db.define('movitems', {
	id: {
		field: 'ITEMID',
		type: Sequelize.INTEGER(11).UNSIGNED,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	orderToWatch: {
		field: 'ORDERED',
		type: Sequelize.INTEGER,
		allowNull: true,
		unique: true,
	},
	itemName: {
		field: 'ITEMNAME',
		type: Sequelize.STRING(99),
		allowNull: false,
		validate: {
			not: ['^The .*$', 'i'],
		},
	},
	caseType: {
		field: 'ITEMCASE',
		type: Sequelize.ENUM(ITEM_CASES),
		allowNull: false,
		defaultValue: 'Plain',
	},
	digitalType: {
		field: 'ITEMDIGITL',
		type: Sequelize.ENUM(ITEM_DIGITAL_TYPES),
		allowNull: false,
		defaultValue: 'None',
	},
	is3D: {
		field: 'ITEM3D',
		type: Sequelize.ENUM(YES_NO),
		allowNull: false,
		defaultValue: 'N',
	},
	isWatched: {
		field: 'ITEMWATCH',
		type: Sequelize.ENUM(YES_NO),
		allowNull: false,
		defaultValue: 'N',
	},
	formatType: {
		field: 'ITEMFORMAT',
		type: Sequelize.ENUM(ITEM_FORMATS),
		allowNull: false,
		defaultValue: 'Blu-ray',
	},
	itemStatus: {
		field: 'ITEMSTATUS',
		type: Sequelize.ENUM(ITEM_STATUSES),
		allowNull: false,
		defaultValue: 'Owned',
	},
	releaseDate: {
		field: 'ITEMAVAIL',
		type: Sequelize.DATE,
		allowNull: true,
		validate: {
			isDate: true,
		},
	},
	itemURL: {
		field: 'ITEMURL',
		type: Sequelize.STRING(99),
		allowNull: false,
		defaultValue: '',
		validate: {
			isUrl: true,
		},
	},
	itemNotes: {
		field: 'ITEMNOTES',
		type: Sequelize.TEXT,
		allowNull: true,
	},
}, {
	timestamps: false,
	hooks: {
		afterSave: (movieItem, options) => {
			if (movieItem.isWatched === 'Y' && movieItem.orderToWatch != null) {
				movieItem.orderToWatch = null;

				return movieItem.save();
			} else if (movieItem.isWatched === 'N' && movieItem.orderToWatch == null) {
				return MovieItem.findAll({ attributes: [[Sequelize.fn('MAX', Sequelize.col('ORDERED')), 'MAX_ORDERED']] })
					.then(results => {
						let newOrder = 1;

						if (results.length > 0 && results[0].get('MAX_ORDERED')) newOrder = results[0].get('MAX_ORDERED') + 1;

						movieItem.orderToWatch = newOrder;

						return movieItem.save();
					});
			}
		},
	},
});

const MovieModel = db.define('movies', {
	id: {
		field: 'MOVIEID',
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	itemID: {
		field: 'ITEMID',
		type: Sequelize.INTEGER(11).UNSIGNED,
		allowNull: true,
	},
	movieTitle: {
		field: 'MOVIETITLE',
		type: Sequelize.STRING(99),
		allowNull: true,
		validate: {
			not: ['^The .*$', 'i'],
		},
	},
	movieURL: {
		field: 'MOVIEURL',
		type: Sequelize.STRING(99),
		allowNull: true,
		validate: {
			isUrl: true,
		},
	},
}, {
	timestamps: false,
});

MovieModel.belongsTo(MovieItemModel, { foreignKey: 'ITEMID' });

// Create the tables if they don't exist yet
db.sync();

export const MovieItem = db.models.movitems;
export const Movie = db.models.movies;

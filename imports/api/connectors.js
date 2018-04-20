'use strict';

import { Meteor } from 'meteor/meteor';
import Sequelize from 'sequelize';

const { userName, password, url: host, port } = Meteor.settings.private.database;

// Create the connection
const db = new Sequelize('media_tracker', userName, password, {
	host,
	port,
	dialect: 'mysql'
});

// Define the models
const MovieItemModel = db.define('movitems', {
	ITEMID: { type: Sequelize.INTEGER, primaryKey: true },
	ORDERED: { type: Sequelize.INTEGER },
	ITEMNAME: { type: Sequelize.STRING },
	ITEMCASE: { type: Sequelize.STRING },
	ITEMDIGITL: { type: Sequelize.STRING },
	ITEM3D: { type: Sequelize.STRING },
	ITEMWATCH: { type: Sequelize.STRING },
	ITEMFORMAT: { type: Sequelize.STRING },
	ITEMSTATUS: { type: Sequelize.STRING },
	ITEMAVAIL: { type: Sequelize.DATE },
	ITEMURL: { type: Sequelize.STRING },
	ITEMNOTES: { type: Sequelize.STRING }
}, {
	timestamps: false
});

const MovieModel = db.define('movies', {
	MOVIEID: { type: Sequelize.INTEGER, primaryKey: true },
	ITEMID: { type: Sequelize.INTEGER },
	MOVIETITLE: { type: Sequelize.STRING },
	MOVIEURL: { type: Sequelize.STRING }
}, {
	timestamps: false
});

// Create the tables if it doesn't exist yet
db.sync();

export const MovieItem = db.models.movitems;
export const Movie = db.models.movies;

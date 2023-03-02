const { DataTypes } = require('sequelize');

const db = require('../utils/database');
const Seasons = require('./seasons.models');

const Episodes = db.define('episodes', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
	},
	seasonId: {
		type: DataTypes.UUID,
		references: {
			model: Seasons,
			key: 'id',
		},
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	synopsis: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	episodeNumber: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	duration: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	episodeUrl: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	coverUrl: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = Episodes;

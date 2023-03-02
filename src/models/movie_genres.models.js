const { DataTypes } = require('sequelize');

const db = require('../utils/database');
const Movies = require('./movies.models')
const Genres = require('./genres.models')

const MovieGenres = db.define('movie_genres', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
	},
	movieId: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: Movies,
			key: 'id',
		},
	},
	genreId: {
		type: DataTypes.INTEGER,
		// autoIncrement:true,
		allowNull: false,
		references: {
			model: Genres,
			key: 'id',
		},
	}
});

module.exports = MovieGenres;

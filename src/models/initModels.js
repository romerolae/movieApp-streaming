const Movies = require('./movies.models');
const MovieGenres = require('./movie_genres.models');
const Genres = require('./genres.models');
const SeriesGenres = require('./series_genres.models');
const Seasons = require('./seasons.models');
const Episodes = require('./episodes.models');
const Series = require('./series.models');
const Users = require('./users.models')

const initModels = () => {
    //?
    Users
	//? movies - movie_genres

	MovieGenres.belongsTo(Movies);
	Movies.hasMany(MovieGenres);

	//? genres -movie_genres
	MovieGenres.belongsTo(Genres);
	Genres.hasMany(MovieGenres);
    
	//? series - seasons
	Seasons.belongsTo(Series)
    Series.hasMany(Seasons)

    

	//? seasons - episodes

	Episodes.belongsTo(Seasons);
	Seasons.hasMany(Episodes);
	//? series - serie_genres
	// Series.belongsToMany(Genres, { through: SerieGenres, foreignKey: "serieId" });
	// Genres.belongsToMany(Series, { through: SerieGenres, foreignKey: 'genreId' });

	SeriesGenres.belongsTo(Series);
	Series.hasMany(SeriesGenres);

	//? genres -serie_genres
	SeriesGenres.belongsTo(Genres);
	Genres.hasMany(SeriesGenres);

};

module.exports = initModels;

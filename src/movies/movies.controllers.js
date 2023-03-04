const Movies = require('../models/movies.models')
const MoviesGenres = require('../models/movie_genres.models')
const uuid = require('uuid')
const Genres = require('../models/genres.models')
const MovieGenres = require('../models/movie_genres.models')
//? Sequelize operators
const {Op} = require('sequelize')

const findAllMovies = async (limit, offset, search)=>{
    //* limit -> Cuantos quiero mostrar
    //* offset -> A partir de donde quiero mostrar
    // const queryOptions ={
    //     limit: limit || 20,
    //     offset: offset || 0

    // }

    // if(limit && offset){
    //     queryOptions.limit = limit
    //     queryOptions.offset = offset
    // }

    const queryOptions = {
        limit: limit,
        offset: offset,
        where: {}
    }

    if(search){
        queryOptions.where = {
            title: {
                [Op.iLike] : `%${search}%`
            }

        }
    }



    const data = await Movies.findAndCountAll(queryOptions)
    return data
}

const createMovie = async (movieObj)=>{
    const newMovie ={
        id: uuid.v4(),
        title: movieObj.title,
        synopsis: movieObj.synopsis,
        releaseYear: movieObj.releaseYear,
        director: movieObj.director,
        duration: movieObj.duration,
        thrillerUrl: movieObj.thrillerUrl,
        coverUrl: movieObj.coverUrl,
        movieUrl: movieObj.movieUrl,
        classification: movieObj.classification,
        rating: movieObj.rating
    }
    const data = await Movies.create(newMovie)
    return data
}

const addGenreToMovie = async ({movieId, genreId})=>{
   const data = await MoviesGenres.create({
        id: uuid.v4(),
        movieId: movieId,
        genreId: genreId
   })
   return data
}

const findAllMoviesByGenre = async (genreId) => { //Create the filter 
	const data = await Movies.findAll({
        include:{
            model: MovieGenres,
            include:{
                model: Genres,
                where:{
                    id:genreId
                }
            }
        }
    });
	return data;
};




module.exports ={
    createMovie,
    findAllMovies,
    addGenreToMovie,
    findAllMoviesByGenre
}
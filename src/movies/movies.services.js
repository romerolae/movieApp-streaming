const movieControllers = require("./movies.controllers")
const responses = require("../utils/handleResponses")
const {addToFirebaseMovieVideo} = require('../utils/firebase')


const getAllMovies = (req, res) =>{
    movieControllers.findAllMovies()
    .then(data=>{
        responses.success({
            status: 200,
            data,
            message:'Getting all movies',
            res
        })
    })
    .catch(err=>{
        responses.error({
            status: 400,
            message: 'Something bad getting all movies',
            data: err,
            res
        })
    })

}

const postMovie = async (req, res) => {
	const movieObj = req.body;
	const movieFile = req.file;

	try {
		const movieUrl = await addToFirebaseMovieVideo(movieFile);
		const data = await movieControllers.createMovie({ ...movieObj, movieUrl });
		responses.success({
			res,
			status: 201,
			data,
			message: 'Movie Created! :D',
		});
	} catch (err) {
		responses.error({
			res,
			data: err,
			message: err.message,
			status: 400,
			fields: {
				title: 'string',
				synopsis: 'string',
				releaseYear: 2020,
				director: 'string',
				duration: 180,
				trillerUrl: 'a',
				coverUrl: 'a',
				classification: 'string',
				rating: 0.0,
			},
		});
	}
};

const postGenreToMovie =(req, res) =>{
	const {movieId, genreId} = req.params

	movieControllers.addGenreToMovie({movieId, genreId})
		.then(data=>{
			responses.success({
				res,
				status: 201,
				message: 'Genre added to movie successfully',
				data
			})
		})
		.catch(err=>{
			responses.error({
				res,
				status: 400,
				message: err.message,
				data: err
			})
		})
}


const getAllMoviesByGenre = (req, res) =>{
	const genreId = req.params.genreId

    movieControllers.findAllMoviesByGenre(genreId)
    .then(data=>{
        responses.success({
            status: 200,
            data,
            message:`Getting all movies by genre ${genreId}`,
            res
        })
    })
    .catch(err=>{
        responses.error({
            status: 400,
            message: 'Something bad getting all movies',
            data: err,
            res
        })
    })

}

module.exports ={
    getAllMovies,
    postMovie,
	postGenreToMovie,
	getAllMoviesByGenre
}
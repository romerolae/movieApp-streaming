const firebase = require('firebase/app')
const { getStorage, uploadBytes, ref, getDownloadURL} = require('firebase/storage')

const config = require('../../config').api.firebase

const firebaseApp = firebase.initializeApp(config)

const storage = getStorage(firebaseApp)
//? peliculas 

const addToFirebaseMovieVideo = async (file) =>{
    const movieRef = ref(storage, `movieVideos/${Date.now()}-${file.originalname}`)
    
    await uploadBytes(movieRef, file.buffer)
    const movieUrl = await getDownloadURL(movieRef)
    return movieUrl
}

const addToFirebaseSeriesSeasonCover = async(file, name, season)=>{
    const movieRef = ref(storage, `series/${name}/${season}/${Date.now()}-${file.originalname}`)

    await uploadBytes(movieRef, file.buffer)
    const movieUrl = await getDownloadURL(movieRef)
    return movieUrl
}
//? cover peliculas

//? Serie - name - temporada - Cover
//? Serie - name - temporada - episodio 

module.exports = {
    addToFirebaseMovieVideo,
    addToFirebaseSeriesSeasonCover
}


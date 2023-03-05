const express = require('express')
const swaggerUi = require('swagger-ui-express')

const responseHandlers = require('./utils/handleResponses')
const db = require('./utils/database')
const initModels = require('./models/initModels')
const config = require('../config').api
//? Multer import
const upload = require('./utils/multer')
//? Swagger
const swaggerDoc = require('./swagger.json')

const userRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')
const moviesRouter = require('./movies/movies.routers')
const genreRouter = require('./genres/genres.routers');



const app = express()

app.use(express.json())

db.authenticate()
    .then(() => console.log('Database authenticated'))
    .catch(err => console.log(err))

db.sync()
    .then(() => console.log('Database Synced'))
    .catch(err => console.log(err))

initModels()

app.get('/', (req, res) => {
    responseHandlers.success({
        res,
        status: 200,
        message: 'Servidor inicializado correctamente',
        data: {
            "users": `${config.host}/api/v1/users`,
            
        }
    })
})

//? Ruta de ejemplo para subir imágenes 
app.post('/upload-file',upload.single('myImage'), (req, res)=>{
    const file = req.file
    res.status(200).json({file})
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/genres', genreRouter);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

//? Esta debe ser la ultima ruta en mi app
app.use('*', (req, res)=> {
    responseHandlers.error({
        res,
        status: 404,
        message: `URL not found, please try with ${config.host}`,
    })
})

app.listen(config.port,() => {
    console.log(`Server started at port ${config.port}`)
})

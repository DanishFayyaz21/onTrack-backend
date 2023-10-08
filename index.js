import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import './configDB/connectdb.js'
import apiRoutes from './routes/apiRoutes.js'
import teamRoutes from './routes/teamRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import bodyParser from 'body-parser'
dotenv.config()

// initialzing express (creating instance)

const app = express()

// app port

const port = process.env.APP_PORT

// cors options

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200 // 204 makes issues on legacy browsers and smart tvs.
}))


// app.use('/uploads', express.static('uploads'))
app.use('/uploads', express.static('uploads'));

// requests can be of only json type.
app.use(express.json(({ limit: '5mb' })))
app.use(bodyParser.json());

// different apis that application is using

app.use('/api/v1', apiRoutes)
app.use('/api/v1', teamRoutes)
app.use('/api/v1', taskRoutes)

//listening app
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})



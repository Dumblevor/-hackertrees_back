import express from "express";
import router from "./views/router.js"
import cors from 'cors' 
import { port } from './config/environment.js'
import { connectToDB } from "./db/helpers.js"
import logger from "./middleware/logger.js"
import mongoSanitize from 'express-mongo-sanitize'
import errorHandler from "./middleware/errorHandler.js"

// import morgan from "morgan" //for logging purposes
// import fs from 'fs'
// const dir = process.cwd() + '/logs/access.log'

const app = express()


app.use(express.json())

app.use(cors())

app.use(mongoSanitize());

// app.use(morgan('common', { //Using morgan as our logger
//   stream: fs.createWriteStream(dir, { flags: 'a' }),
// }));

app.use(logger)

app.use('/api', router)

app.use(errorHandler)

async function startApp() {
  try {
    await connectToDB()
    console.log('Database has connected!')

    app.listen(port, () => console.log('Express is now running'))

  } catch (e) {
    console.log('Something went wrong starting app..')
    console.log(e)
  }
  // await disconnectDB()
}

startApp()

export default app
// deployment
import dotenv from 'dotenv'
dotenv.config()

export const dbURL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/hackertrees'
export const port = process.env.PORT || 4000
export const secret = process.env.SECRET || 'growTreesNoChopChopGottaSustain'



// //old ver

// const environment = process.env.NODE_ENV

// const mongoURL = "mongodb://127.0.0.1:27017/"

// export const dbURL = environment === 'test'
//   ? `${mongoURL}hackertrees-test`
//   : `${mongoURL}hackertrees`

// //secret for jwt
// export const secret = "growTreesNoChopChopGottaSustain"


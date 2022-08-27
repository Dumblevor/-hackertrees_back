
import mongoose from 'mongoose'
import JobModel from '../models/jobModel.js'
import User from '../models/userModel.js'
import JobData from './data/jobData.js'
import { disconnectDB, connectToDB } from './helpers.js'

async function seed() {

  await connectToDB()
  //await mongoose.connection.db.dropDatabase()
  const newUser = await User.findOne({ username: "Daniel" })
  JobData.forEach( post => {
    post.user = newUser
  })
  const jobs = await JobModel.create(JobData)
  await disconnectDB()
}
seed()
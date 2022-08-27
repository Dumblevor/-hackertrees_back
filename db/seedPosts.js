// ? A file that will be used to 'seed' our database with initial data.

import mongoose from 'mongoose'
import PostModel from '../models/postModel.js'
import User from '../models/userModel.js'
import PostsData from './data/postsData.js'
import { disconnectDB, connectToDB } from './helpers.js'
import userData from './data/userData.js'

async function seedPosts() {

  await connectToDB()

  await mongoose.connection.db.dropDatabase()

  console.log('Connected to the database! 🌱')

  const users = await User.create(userData)
  const dimUser = users[0]


  const postsWithUSers = PostsData.map(post => {
    return { ...post, user: dimUser }
  })



  const userPost = await PostModel.create(postsWithUSers)
  console.log(userPost)

  await disconnectDB()
  console.log('Goodbye 🌱')
}
seedPosts()
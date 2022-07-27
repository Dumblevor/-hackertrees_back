import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import axios from 'axios'


async function register(req, res, next) {
  const body = req.body
  console.log(body.password);
  try {
    if (body.password !== body.passwordConfirmation) {
      return res.status(422).json({
        message: "Passwords do not match",
        errors: {
          passwordConfirmation: "Passwords do not match",
        },
      })
    }
    const newUser = await User.create(body)
    res.status(201).json({ message: "Login ok" })

  } catch (err) {
    next(err)
  }
}


async function login(req, res, next) {
  console.log("hello");
  console.log(`Email ----${req.body.email}`);

  try {
    const user = await User.findOne({ email: req.body.email })
    const isValidPw = user.validatePassword(req.body.password)

    if (isValidPw) {
      const token = jwt.sign(
        { userId: user._id },
        secret,
        { expiresIn: '24h' }
      )

      res.status(200).json({
        message: "Login succesful!",
        token,
        user,
      })
    } 
  } catch (err) {
    next(err)
  }
}


async function getUserData(req, res) {
  try {
    const allUser = await User.find()
    res.json(allUser)
  } catch (e) {
    res.status(500).json({ message: "We had problems handling your request on our side. Please try again later." })
  }
}

async function removeUserData(req, res) {
  const deleteUser = req.body
  const deletedUser = await User.deleteOne(deleteUser)
  res.status(201).json(deletedUser)
}

async function updateUserData(req, res) {
  const userID = req.params.userID
  const body = req.body

  const updatedUser = await User.findByIdAndUpdate(userID, body, { new: true })

  res.status(201).json(updatedUser)

}

async function getSingleUserData(req, res) {
  try {
    const userID = req.params.userID
    const user = await User.findById(userID)

    if (!user) return res.json({ message: "User not found" })

    res.json(user)

  } catch (e) {
    res.json({ message: 'There was problem trying to get this User' })
  }
}


export default {
  register,
  login,
  getUserData,
  removeUserData,
  updateUserData,
  getSingleUserData,
}
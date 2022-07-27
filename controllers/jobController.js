 

import Job from "../models/jobModel.js"

async function createJob (req, res, next) {
  try {
    const newJob = req.body  
    newJob.user = req.currentUser
    newJob.likes = 1
    const createdJob = await Job.create(newJob) 
    res.status(201).json(createdJob)
    
  } catch (error) {
    next(error)
  }
}

async function getJobs (req, res) {
  try {
    const allJobs = await Job.find()
    console.log(allJobs);
    res.status(200).json(allJobs)

  } catch (error) {
    res.json("Cannot get jobs")
  }
}

async function showJob (req, res) {
  try {
    const jobId = req.params.jobId
    const job = await Job.findById(jobId).populate('user').populate('comments.user')
    res.status(200).json(job)

  } catch (error) {
    console.log(error);
  }
}

async function editJob (req, res, next) {

  console.log(`This is the request body${req.body}`);
  //Just changes a string value in salary to a number 
  if (typeof req.body.jobSalary === 'string') {
    req.body.jobSalary = Number(req.body.jobSalary)
  }
  try {
    const jobId = req.params.jobId
    const job = await Job.findByIdAndUpdate(jobId, { ...req.body }, { runValidators: true })
    res.status(200).json(job)

  } catch (error) {
    console.log(error);
    next(error)
  }
}

async function deleteJob (req, res) {
  try {
    console.log("I made it to the job controller");
    const jobId = req.params.jobId
    const deletedJob = await Job.findByIdAndDelete(jobId)
    res.status(200).json(deletedJob)
    
  } catch (error) {
    console.log(error);
  }

}

async function likeJob(req, res) {

  const jobId = req.params.jobId
  const currUser = req.body.currentUser

  const job = await Job.findById(jobId)

  console.log(job);

  //checks if there is a match in the userliked array
  const isThereMatch = job.userLiked.filter((username) => {
    return currUser === username
  });
  //if user hasn't liked the job....
  if (isThereMatch.length === 0) {
    const updateJobComment = await Job.findOneAndUpdate({ '_id': jobId }, { 'likes': req.body.likes } , { new: true })
    console.log(updateJobComment);
    const addUserToLiked = await Job.findOneAndUpdate({ '_id': jobId }, { $push: { 'userLiked': currUser } } , { new: true })
    console.log(addUserToLiked);
    res.json(addUserToLiked);
  } else {
    return
  }
}

export default {
  createJob,
  getJobs,
  showJob,
  editJob,
  deleteJob,
  likeJob,
}
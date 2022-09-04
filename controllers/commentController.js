import PostModel from '../models/postModel.js'
import JobModel from '../models/jobModel.js'


async function commentOnPost(req, res) {
  try {
    const postID = req.params.postID
    const user = req.currentUser
    const comment = req.body
    const postData = await PostModel.findById(postID).populate('user').populate('userComments.user')
    console.log("user searching", req.currentUser);

    if (!postData) {
      return res.json({ message: 'No such post has been found' })
    }
    comment.user = user

    postData.userComments.push(comment)
    const savedPostWComment = await postData.save()
    
    // console.log(savedPostWComment);
    res.status(200).json(savedPostWComment)
  } catch (e) {
    console.log(e)
    res.json({ message: "There was a problem posting this comment." })
  }
}

async function commentOnJob(req, res) {
  try {
    const jobId = req.params.jobId
    const comment = req.body

    const job = await JobModel.findById(jobId).populate('user').populate('comments.user')

    if (!job) {
      return res.json({ message: 'job has not been found' })
    }
    // ! Push the new comment to the comments array
    comment.user = req.currentUser._id
    comment.likes = 1
    comment.userLiked = comment.user.toString()

    job.comments.push(comment)

    // ! So we need to save it to the database.
    const savedJobWithComment = await job.save()
    // ! Sending back the comment
    res.status(200).json(savedJobWithComment)
  } catch (e) {
    console.log(e)
    res.json({ message: "There was a problem posting this comment." })
  }
}

async function deleteJobComment(req, res) {
  console.log(req);
  const jobId = req.params.jobId
  const commentId = req.params.commentId
  const deletedComment = await JobModel.findByIdAndUpdate(
    jobId,
    {
      $pull: { comments: { _id: commentId } },
    },
    { new: true }
  );
  console.log(deletedComment);
  res.status(200).json(deletedComment)
}

async function likeJobComment(req, res) {

  const jobId = req.params.jobId
  const commentId = req.params.commentId
  const currUser = req.body.currentUser

  const job = await JobModel.findById(jobId)

  const likedComment = job.comments.filter((comment) => {
    return comment._id.toString() === commentId
  })

  const isThereMatch = likedComment[0].userLiked.filter((username) => {
    return currUser === username
  });

  if (isThereMatch.length === 0) {
    const updateJobComment = await JobModel.findOneAndUpdate({ 'comments._id': commentId }, { $set: { 'comments.$.likes': req.body.likes } }, { new: true })
    const addUserToLiked = await JobModel.findOneAndUpdate({ 'comments._id': commentId }, { $push: { 'comments.$.userLiked': currUser } }, { new: true })
    console.log(addUserToLiked);
    const likes = updateJobComment.comments.filter((comment) => {
      return comment._id.toString() === commentId
    })
    res.json(likes);
  } else {
    return
  }
}


async function removeComment(req, res) {
  try {
    const postID = req.params.postID
    const commentID = req.params.commentID
    const deletePostComment = await PostModel.findByIdAndUpdate(
      postID,
      {
        $pull: { userComments: { _id: commentID } },
      },
      { new: true }
    );
    if (!deletePostComment) return res.json({ message: "The requested comment does not exist and therefore cannot be deleted." })
    res.status(204).json({ message: 'Delete successful.' })
  } catch (e) {
    res.status(422).json({ message: "This Post ID is in an invalid format." })
  }
}




export default {
  commentOnPost,
  commentOnJob,
  deleteJobComment,
  likeJobComment,
  removeComment,
}
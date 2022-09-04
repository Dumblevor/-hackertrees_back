
import express from "express"
import postController from "../controllers/postController.js"
import jobController from "../controllers/jobController.js"
import userController from "../controllers/userController.js"
import commentController from "../controllers/commentController.js"
import secureRoute from "../middleware/secureRoute.js"

const router = express.Router()

router.route("/posts/")
  .get(secureRoute, postController.getPosts)
  .post(secureRoute, postController.createPost)

router.route("/posts/:postID")
  .get(secureRoute, postController.getPostByID)
  .delete(secureRoute, postController.removePost)
  .put(secureRoute, postController.editPost)


router.route("/posts/:postID/comment")
  .post(secureRoute, commentController.commentOnPost)

router.route("/posts/:postID/vote")
  .post(secureRoute, postController.likePost)

router.route("/posts/:postID/:commentID")
  .delete(secureRoute, commentController.removeComment)

router.route("/jobs/")
  .get(secureRoute, jobController.getJobs)
  .post(secureRoute, jobController.createJob)

router.route("/jobs/:jobId")
  .get(jobController.showJob)
  .delete(secureRoute, jobController.deleteJob)

router.route("/jobs/:jobId/likes")
  .put(jobController.likeJob)

router.route("/jobs/edit/:jobId")
  .put(secureRoute, jobController.editJob)

router.route("/jobs/create")
  .post(secureRoute, jobController.createJob)

router.route("/jobs/:jobId/:commentId")
  .delete(commentController.deleteJobComment)

router.route("/jobs/:jobId/:commentId/likes")
  .put(commentController.likeJobComment)

router.route("/jobs/:jobId/comment")
  .post(secureRoute, commentController.commentOnJob)

router.route("/register")
  .post(userController.register)

router.route("/login")
  .post(userController.login)

router.route("/profile")
  .get(secureRoute, userController.getUserData)
  .delete(secureRoute, userController.removeUserData)
  .put(secureRoute, userController.updateUserData)

router.route("/profile/:userID")
  .get(secureRoute, userController.getSingleUserData)
  .delete(secureRoute, userController.removeUserData)
  .put(secureRoute, userController.updateUserData)



export default router
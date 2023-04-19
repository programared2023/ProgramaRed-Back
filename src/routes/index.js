const { Router } = require('express');
const { getPostById, getAllPost, savePostLike, deletePostLike, createPost, getAllPost2, updatePost, deletePost } = require('../controllers/Post');
const getAllTags = require('../controllers/Tags');
const { createUserAuth0, getUserByUsername, getUserById, getAllUsers, registerUser, deleteUser, updateUser, loginUser } = require('../controllers/User');
const { createSubscription, createPayment, menssegerSuscribe } = require('../controllers/Subscription');
const { saveFavorite, getFavoritesByUser, deleteFavorite } = require('../controllers/Favorite');
const { saveComment, updateComment, deleteComment, saveCommentLike, deleteCommentLike } = require('../controllers/Comment');
const { getRatingId,saveRating, updateRating } = require('../controllers/Rating');
const { countUsers, countPostByTag, commonTags, getUsers, unbanUser, getActiveUsers } = require("../controllers/Dashboard");
const auth = require('../middleware/auth');
const { createReport } = require('../controllers/Report');

const router = Router();

router.post("/login", loginUser)
router.post('/register', registerUser);
router.get('/user', getAllUsers);
router.get("/user/:id", getUserById);
router.get('/user/username/:username', getUserByUsername);
router.delete('/user/:id', deleteUser)
router.put('/user/:id', updateUser)
router.get('/usercreate', createUserAuth0)

router.post('/post', createPost);
router.get('/post', getAllPost)
router.get('/posts', getAllPost2)
router.get('/post/:id', getPostById)
router.put('/post/:id', updatePost)
router.delete('/post/:id', deletePost)

router.get('/tags', getAllTags)

router.post('/subcriptionsEmail', menssegerSuscribe)
router.post('/subcriptions', createSubscription)
router.post('/payments', createPayment)

router.post('/favorites', saveFavorite)
router.get('/favorites/:userId', getFavoritesByUser)
router.delete('/favorites', deleteFavorite)

router.post('/comments', saveComment)

router.post('/comments', saveComment)
router.put("/comments/:id", updateComment)
router.delete("/comments", deleteComment)
router.put("/saveCommentLike/:id", saveCommentLike)
router.put("/deleteCommentLike/:id", deleteCommentLike)

router.post("/rating", saveRating)
router.put("/rating/:id", updateRating)
router.get("/rating/:id", getRatingId)
router.put("/savePostLike/:id", savePostLike)
router.put("/deletePostLike/:id", deletePostLike)

router.post("/report", createReport)
/** RUTAS DEL DASHBOARD */
router.get("/countUsers", countUsers)
router.get("/countPosts", countPostByTag)
router.get("/commonTags", commonTags)
router.get("/allUsers", getUsers)
router.put("/unbanUser/:id", unbanUser)
router.get("/getActiveUsers", getActiveUsers)

module.exports = router;
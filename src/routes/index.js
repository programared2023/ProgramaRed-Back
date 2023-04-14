const { Router } = require('express');
const { getPostById, getAllPost, createPost, getAllPost2, updatePost, deletePost } = require('../controllers/Post');
const getAllTags = require('../controllers/Tags');
const { createUserAuth0, getUserByUsername, getUserById, getAllUsers, registerUser, deleteUser, updateUser, loginUser } = require('../controllers/User');
const { createSubscription, createPayment, menssegerSuscribe } = require('../controllers/Subscription');
const { saveFavorite, getFavoritesByUser, deleteFavorite } = require('../controllers/Favorite');
const { saveComment } = require('../controllers/Comment');
const { saveRating, updateRating } = require('../controllers/Rating');
const { countUsers, countPostByTag, commonTags, getUsers } = require("../controllers/Dashboard");
const auth = require('../middleware/auth');

const router = Router();

router.post("/login", loginUser)
router.post('/register', registerUser);
router.get('/user', auth, getAllUsers);
router.get("/user/:id", auth, getUserById);
router.get('/user/username/:username', auth, getUserByUsername);
router.delete('/user/:id', auth, deleteUser)
router.put('/user/:id', auth, updateUser)
router.get('/usercreate', createUserAuth0)

router.post('/post', auth, createPost);
router.get('/post', auth, getAllPost)
router.get('/posts', auth, getAllPost2)
router.get('/post/:id', auth, getPostById)
router.put('/post/:id', auth, updatePost)
router.delete('/post/:id', auth, deletePost)

router.get('/tags', auth, getAllTags)

router.post('/subcriptionsEmail', auth, menssegerSuscribe)
router.post('/subcriptions', auth, createSubscription)
router.post('/payments', auth, createPayment)

router.post('/favorites', auth, saveFavorite)
router.get('/favorites/:userId', auth, getFavoritesByUser)
router.delete('/favorites', auth, deleteFavorite)

router.post('/comments', auth, saveComment)
router.post("/rating", auth, saveRating)
router.put("/rating/:id", auth, updateRating)

/** RUTAS DEL DASHBOARD */
router.get("/countUsers", auth, countUsers)
router.get("/countPosts", auth, countPostByTag)
router.get("/commonTags", auth, commonTags)
router.get("/allUsers", auth, getUsers)

module.exports = router;
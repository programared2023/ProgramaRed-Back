const { Router } = require('express');
const { getPostById, getAllPost, createPost, getAllPost2 } = require('../controllers/Post');
const getAllTags = require('../controllers/Tags');
const { getUserById, getAllUsers, createUser } = require('../controllers/User');
const { createSubscription, createPayment } = require('../controllers/Subscription');
const { saveFavorite, getFavoritesByUser, deleteFavorite } = require('../controllers/Favorite');
const { saveComment } = require('../controllers/Comment');

const router = Router();

router.post('/user', createUser);
router.get('/user', getAllUsers);
router.get("/user/:id", getUserById);

router.post('/post', createPost);
router.get('/post', getAllPost)
router.get('/posts', getAllPost2)
router.get('/post/:id', getPostById)

router.get('/tags', getAllTags)

router.post('/subcriptions', createSubscription)
router.post('/payments', createPayment)

router.post('/favorites', saveFavorite)
router.get('/favorites/:userId', getFavoritesByUser)
router.delete('/favorites', deleteFavorite)

router.post('/comments', saveComment)

module.exports = router;
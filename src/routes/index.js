const { Router } = require('express');
const { getPostById, getAllPost, createPost, getAllPost2 } = require('../controllers/Post');
const getAllTags = require('../controllers/Tags');
const { getUserById, getAllUsers, createUser } = require('../controllers/User');
const { createSubscription } = require('../controllers/Subscription');

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
module.exports = router;
const { Router } = require('express');
const { getPostById, getAllPost, createPost, getAllPost2, updatePost, deletePost } = require('../controllers/Post');
const getAllTags = require('../controllers/Tags');
const { getUserByEmail, getUserById, getAllUsers, createUser, deleteUser, updateUser } = require('../controllers/User');
const { createSubscription, createPayment } = require('../controllers/Subscription');
const { saveFavorite, getFavoritesByUser, deleteFavorite } = require('../controllers/Favorite');
const { saveComment } = require('../controllers/Comment');
const axios = require("axios"); //temporal
const { conn} = require('../db'); //temporal

const router = Router();

router.post('/user', createUser);
router.get('/user', getAllUsers);
router.get("/user/:id", getUserById);
router.get('/user/email/:email', getUserByEmail);
router.delete('/user/:id', deleteUser)
router.put('/user/:id', updateUser)


// router.get('/usercreate', async function(req, res) {
//   const accessToken =req.headers.authorization.split(' ')[1]
   
//   try {
//     const response = await axios.get('https://dev-ld1rfpxkhqa8gz6z.us.auth0.com/userinfo',{
//             headers:{
//                 authorization: `Bearer ${accessToken}`
//             }
//         })
//     const userinfo = response.data
//     const { nickname, email } = userinfo;
//     console.log(nickname)
//     console.log(email)
//     //creando el usuario manualmente en la base
//     if (nickname && email) {
//             const [user, created] = await conn.model('User').findOrCreate({ 
//               where: { email: email },
//               defaults:{
//               username: nickname,  
//               email: email
//               }
//             })
//             console.log(user);
//             console.log(created); 
//             return res.status(200).send("el usuario fue creado con exito")
//         }
//         return res.status(400).json({ error: "faltan datos" })

//   }catch(e){
//     res.json({
//       error: e.message
//     })
//   }
  
// });


router.post('/post', createPost);
router.get('/post', getAllPost)
router.get('/posts', getAllPost2)
router.get('/post/:id', getPostById)
router.put('/post/:id', updatePost)
router.delete('/post/:id', deletePost)

router.get('/tags', getAllTags)

router.post('/subcriptions', createSubscription)
router.post('/payments', createPayment)

router.post('/favorites', saveFavorite)
router.get('/favorites/:userId', getFavoritesByUser)
router.delete('/favorites', deleteFavorite)

router.post('/comments', saveComment)

module.exports = router;
const { Router } = require('express');
const { restart } = require('nodemon');
const { QueryTypes } = require('sequelize');
const {User, Post, Tag}= require("../db");



const router = Router();


router.get('/user', async(req, res) => {
   const{name}=req.query
   const allUser =await User.findAll()//?incluitt post

   try {
      if(name){
               const searchName=await allUser.find((e)=>e.username===name)
               return res.status(200).json(searchName)
               }
      if(allUser.length>0){
               return  res.status(200).send(allUser)}
         return res.status(400).json({error:" no hay usuarios cargados"})
   } catch (error) {
      return res.status(400).json({error:"error a traer todos los usuarios"})}
});


router.post('/user', async(req, res) => {
   const {username,password,email,birthdate}=req.body;
  
   if(username&&password&&email&&birthdate){
      const addUser=await User.create({username:username,password:password,email:email, birthdate:birthdate}) 
   return res.status(200).send("el usuario fue creado con exito")} 
 return res.status(400).json({error:"faltan datos"})
});


router.get("/user/:id", async(req,res)=>{
   const {id}=req.params;

    try {
            const getId=await User.findByPk(id)
            if(!getId){
               return res.status(400).send({error:"El Id no Existe"})
            }
            return res.status(200).json(getId)
         }catch (error){
            return res.status(400).json({error:"error a traer por id"})}
});


router.post('/post', async(req, res) => {
   const { title,description,file,userId,nameTag,fileTag}=req.body;

   if(title&&description&&file&&userId&&nameTag&&fileTag){
      const addPost=await Post.create({title:title,description:description,file:file,UserId:userId}) 
      const addTag=await Tag.create({name:nameTag,file:fileTag 
      })
      return res.status(200).send("el post fue creado con exito")}
   return res.status(400).json({error:"faltan datos"})
});


router.get('/post', async(req, res) => {
   const searchPosts =await Post.findAll()//?incluir comentario
   
   try {
      if(searchPosts.length>0){
         return  res.status(200).send(searchPosts) }
      return res.status(400).json({error:"no contiene post"})
   }catch (error) {
     return res.status(400).json({error:"error a traer todos los post"})
}
});


module.exports = router;

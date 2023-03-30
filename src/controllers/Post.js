const { Router } = require('express');
const {conn, Post} = require ('../db');
const axios = require ('axios');

const router = Router();

async function getAllPost (req, res) {
    const searchPosts =await Post.findAll()//?incluir comentario
   
   try {
      if(searchPosts.length>0){
         return  res.status(200).send(searchPosts) }
      return res.status(400).json({error:"no contiene post"})
   }catch (error) {
     return res.status(400).send(error.message)
}
};

const getPostByName = async (req, res) => {
    try {
        let name = req.query.name;
        let allPost = await getAllPost();
        if (name) {
           let postName = await allPost.filter((el) => 
           el.name.toLowerCase().includes(name.toLowerCase()));
           postName.length
           ? res.status(200).send(postName)
           : res.status(404).send('post no encontrado');
        } else {
           res.status(200).send(allPost);
        }
     } catch (error) {
        res.status(400).send({ error: error.message });
     }
}

const getPostById = async (req, res) => {
    try {
        const { id } = req.query
        const post = await conn.model('Post').findByPk(id)
        if (post) {
            return res.status(200).json(post)
        } else {
            return res.status(404).send('No se encontro el post')
        }
    } catch (error) {
        //console.log(error);
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllPost,
    getPostById,
    getPostByName
}
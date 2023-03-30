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
    console.log('Ruta de Post por Nombre');
    const { name } = req.query
    let options = {}
    try {
        if (name) {
            options = {
                ...options,
                where: {
                    username: name
                }
            }
        }
        const allPost = await conn.model('Post').findAll(options)
        if (allPost.length > 0){
            return res.status(200).send(allPost)
        }
        return res.status(404).send(' no se encontro el post ')
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

async function getPostById(req, res) {
    console.log('Ruta Post a ID');
    try {
        const { id } = req.query;
        const post = await conn.model('Post').findByPk(id);
        if (post) {
            return res.status(200).json(post);
        } else {
            return res.status(404).send('No se encontro el post');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllPost,
    getPostById,
    getPostByName
}
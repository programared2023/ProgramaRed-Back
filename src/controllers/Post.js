const { conn, Post, User, Tag, Op } = require("../db");

async function getAllPost(req, res) {
  const { title, username, tag } = req.query;
  let options = {
    include: [User, Tag],
  };
  let AND = [];
  try {
    if (title) {
      AND.push({
        title: {
          [Op.like]: `%${title[0].toUpperCase() + title.slice(1)}%`,
        },
      });
    }
    if (username) {
      AND.push({
        "$User.username$": {
          [Op.like]: `%${username}%`,
        },
      });
    }
    if (tag) {
      AND.push({
        "$Tags.name$": {
          [Op.like]: `%${tag[0].toUpperCase() + tag.slice(1)}%`,
        },
      });
    }
    if (AND.length) {
      options = {
        ...options,
        where: {
          [Op.and]: AND,
        },
      };
    }
    const posts = await conn.model("Post").findAll(options);
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}

async function getPostById(req, res) {
  console.log("Ruta Post a ID");
  const { id } = req.params;
  try {
    const post = await conn.model("Post").findByPk(id);
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).send("No se encontro el post");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}

const createPost = async (req, res) => {
  const { title, description, file, userId, tags } = req.body;

  try {
    if (title && description) { // borro provisoriamente file, userId y nameTag
      const newPost = await conn
        .model("Post")
        .create({
          title: title,
          description: description,
          file: file,
          UserId: userId,
        });

      tags.map(async t => {
        const [tag, _] = await conn.model("Tag").findOrCreate({
          name: nameTag,
          where: {
            name: nameTag,
          },
        });
        newPost.addTag(tag);
      })
      return res.status(200).send("el post fue creado con exito");
    }
    return res.status(400).json({ error: "faltan datos" });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

module.exports = {
  getAllPost,
  getPostById,
  createPost,
};

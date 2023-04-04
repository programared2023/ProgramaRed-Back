const { conn, Post, User, Tag, Op } = require("../db");

async function getAllPost2(req, res) {
  const { title, username, tag, titleOrder, dateOrder } = req.query;
  let order = []
  let OR = []
  if (titleOrder) {
    order = [['title', titleOrder]]
  } else if (dateOrder) {
    order = [['publishDate', dateOrder]]
  }

  let options = {
    include: [User, Tag],
    order: order
  };
  try {
    if (title) {
      OR.push({
        title: {
          [Op.iLike]: `%${title}%`,
        },
      });
    }
    if (username) {
      OR.push({
        "$User.username$": {
          [Op.like]: `%${username}%`,
        },
      });
    }
    if (tag) {
      OR.push({
        "$Tags.name$": {
          [Op.like]: `%${tag.toLowerCase()}%`,
        },
      });
    }

    if (OR.length) {
      options = {
        ...options,
        where: {
          [Op.or]: OR
        }
      }
    }

    const posts = await conn.model("Post").findAll(options);
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}

async function getAllPost(req, res) {
  const { search, titleOrder, dateOrder } = req.query;
  let order = []
  // let OR = []
  if (titleOrder) {
    order = [['title', titleOrder]]
  } else if (dateOrder) {
    order = [['publishDate', dateOrder]]
  }

  let options = {
    include: [User, Tag],
    order: order
  };
  try {
    if (search) {
      options = {
        ...options,
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%`, } },
            { "$User.username$": { [Op.like]: `%${search}%` } },
            { "$Tags.name$": { [Op.like]: `%${search}%` } }
          ],
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
    const post = await conn.model("Post").findOne({
      where: { id: id },
      include: [User, Tag]
    });
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
          publishDate: new Date()
        });

      tags.map(async t => {
        const [tag, _] = await conn.model("Tag").findOrCreate({
          name: t,
          where: {
            name: t,
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
  getAllPost2
};

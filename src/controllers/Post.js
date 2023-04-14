const { conn, Post, Rating, User, Tag, Favorite, Comment, Op } = require("../db");

async function getAllPost2(req, res) {
  const { title, username, tag, titleOrder, dateOrder } = req.query;
  let order = []
  let OR = []
  let where = { isActive: true }

  if (titleOrder) {
    order = [['title', titleOrder]]
  } else if (dateOrder) {
    order = [['publishDate', dateOrder]]
  }

  let options = {
    include: [User, Tag],
    where: where,
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
          ...where,
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
  let or = []
  let where = { isActive: true }

  if (titleOrder) {
    order = [['title', titleOrder]]
  } else if (dateOrder) {
    order = [['publishDate', dateOrder]]
  }

  let options = {
    include: [User, Tag],
    where: where,
    order: order
  };
  try {
    if (search) {
      or = [
        { title: { [Op.iLike]: `%${search}%`, } },
        { "$User.username$": { [Op.like]: `%${search}%` } },
        { "$Tags.name$": { [Op.like]: `%${search}%` } }
      ]
    }
    if (or.length) {
      options = {
        ...options,
        where: {
          ...where,
          [Op.or]: or,
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
      where: {
        [Op.and]: [{ id: id }, { isActive: true }]
      },
      include: [User, Tag, {
        model: Rating,
        include: User
      }, Favorite, {
          model: Comment,
          include: User
        }]
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
  const { title, description, files, userId, tags } = req.body;

  try {
    if (title && description && files && tags && userId) {
      const newPost = await conn
        .model("Post")
        .create({
          title: title,
          description: description,
          files: files,
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
      return res.status(200).send("El post fue creado con exito");
    }
    return res.status(400).json({ error: "Faltan datos" });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, tags, files, userId } = req.body

    const [updated] = await conn.model('Post').update({
      title: title,
      description: description,
      files: files,
      tags: tags,
      UserId: userId
    }, {
      where: {
        id: id
      }
    })
    console.log(`${updated} post/s actualizados`);
    const post = await conn.model('Post').findByPk(id)

    if (post) {
      const countDestroyed = await conn.model('PostTag').destroy({
        where: {
          PostId: post.id
        }
      })
      console.log(`${countDestroyed} relations destroyed`);
      tags.map(async t => {
        const [tag, _] = await conn.model("Tag").findOrCreate({
          name: t,
          where: {
            name: t,
          },
        });
        post.addTag(tag)
      })
      return res.status(200).send("Post actualizado")
    }
    return res.status(400).send("Error al actualizar el post")
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message)
  }
}

const deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const [deleted] = await conn.model('Post').update({
      isActive: false
    }, {
      where: {
        id: id
      }
    })
    console.log(`${deleted} post marked as inactive`);
    return res.status(200).send("Post eliminado")
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message)
  }
}

module.exports = {
  getAllPost,
  getPostById,
  createPost,
  getAllPost2,
  updatePost,
  deletePost
};
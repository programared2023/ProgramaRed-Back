const { conn, Op, Post, Tag } = require('../db');

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await conn.model('User').findByPk(id, {
            include: {
                model: Post,
                include: Tag
            }
        })
        if (!user) {
            return res.status(400).send({ error: "El usuario no Existe" })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const { username } = req.query
        let options = {
            include: {
                model: Post,
                include: Tag
            }
        }
        if (username) {
            options = {
                ...options,
                where: {
                    username: {
                        [Op.like]: `%${username.toLowerCase()}%`
                    }
                }
            }
        }
        const users = await conn.model('User').findAll(options)
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const createUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        if (username && password && email) {
            const createdUser = await conn.model('User').create({ username: username, password: password, email: email })

            console.log(createdUser);
            return res.status(200).send("el usuario fue creado con exito")
        }
        return res.status(400).json({ error: "faltan datos" })
    } catch (e) {
        return res.status(400).send(e.message)
    }

}
module.exports = {
    getUserById,
    getAllUsers,
    createUser
}

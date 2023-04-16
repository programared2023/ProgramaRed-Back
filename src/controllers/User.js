const { conn, Op, Post, Tag } = require('../db');
const axios = require("axios");
const jwt = require('jsonwebtoken')

const createUserAuth0 = async (req, res) => {
    const accessToken = req.headers.authorization.split(' ')[1]
    try {
        const response = await axios.get('https://dev-ld1rfpxkhqa8gz6z.us.auth0.com/userinfo', {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
        const userinfo = response.data
        let { nickname, email, picture } = userinfo;
        //creando el usuario de auth0 en la base en caso no exista
        let options = {}
        if (userinfo) {
            !userinfo.email ? options = { username: nickname }
                : options = { email: email }

            console.log('options', options)
            const [user, created] = await conn.model('User').findOrCreate({
                where: options,
                defaults: {
                    username: nickname,
                    email: email,
                    profileImage: picture
                }
            })
            const token = jwt.sign({ user: user.toJSON() }, process.env.SECRET_AUTH_KEY)
            return res.status(200).json({
                user: user.toJSON(),
                msg: "el usuario fue creado con exito",
                token,
                created
            })
        }
        return res.status(400).json({ error: "faltan datos" })
    } catch (e) {
        res.json({
            error: e.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await conn.model("User").findOne({
            where: {
                [Op.and]: [{ username: username }, { password: password }]
            }
        })
        if (!user) return res.status(400).send("Credenciales invalidas")

        const token = jwt.sign({ user: user.toJSON() }, process.env.SECRET_AUTH_KEY)
        return res.status(200).json({ user: user.toJSON(), token })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const users = await conn.model('User').findAll({
            include: {
                model: Post,
                include: Tag
            },
            where: {
                [Op.and]: [
                    { username: { [Op.like]: `%${username}%` } },
                    { isActive: true }
                ]
            }
        })
        if (!users.length) {
            return res.status(400).send({ error: "El usuario no existe" })
        }
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await conn.model('User').findOne({
            include: {
                model: Post,
                include: Tag
            },
            where: {
                [Op.and]: [{ id: id }, { isActive: true }]
            }
        })
        if (!user) {
            return res.status(400).send("El usuario no existe")
        }
        return res.status(200).json(user.toJSON())
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const getAllUsers = async (req, res) => {
    try {
        // const { username } = req.query
        // let where = { isActive: true }
        // let options = {
        //     include: {
        //         model: Post,
        //         include: Tag
        //     }
        // }
        // if (username) {
        //     options = {
        //         ...options,
        //         where: {

        //         }
        //     }
        // }
        const users = await conn.model('User').findAll({
            where: {
                isActive: true
            }
        })
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        if (username && password && email) {
            const createdUser = await conn.model('User').create({ username: username, password: password, email: email })

            console.log(createdUser);
            return res.status(200).send(`el usuario: ${username} fue creado con exito`)
        }
        return res.status(400).json({ error: "faltan datos" })
    } catch (e) {
        return res.status(400).json({ error: e.message })
    }

}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const [deleted] = await conn.model('User').update({
            isActive: false
        }, {
            where: {
                id: id
            }
        })
        console.log(`${deleted} user marked as inactive`);
        return res.status(200).send("Usuario eliminado")
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { profileImage, description, socialLinks, email } = req.body

        let data = {}
        if (profileImage) {
            data = {
                ...data,
                profileImage
            }
        }
        if (description) {
            data = {
                ...data,
                description
            }
        }
        if (socialLinks) {
            data = {
                ...data,
                socialLinks
            }
        }
        if (email) {
            data = {
                ...data,
                email
            }
        }
        console.log(data);
        const [updated] = await conn.model('User').update(data, { where: { id: id } })

        console.log(`${updated} updated user`);
        return res.status(200).send("Usuario actualizado")
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

module.exports = {
    createUserAuth0,
    getUserByUsername,
    getUserById,
    getAllUsers,
    registerUser,
    deleteUser,
    updateUser,
    loginUser
}

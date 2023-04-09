const { conn, Op, Post, Tag } = require('../db');
const axios = require("axios"); 

const createUserAuth0 = async (req, res) => {
  const accessToken =req.headers.authorization.split(' ')[1]
    try{
        const response = await axios.get('https://dev-ld1rfpxkhqa8gz6z.us.auth0.com/userinfo',{
                headers:{
                    authorization: `Bearer ${accessToken}`
                }
            })
        const userinfo = response.data
        const { nickname, email } = userinfo;
        //creando el usuario de auth0 en la base en caso no exista
        if (nickname && email) {
            const [user, created] = await conn.model('User').findOrCreate({ 
                  where: { email: email },
                  defaults:{
                  username: nickname,  
                  email: email
              }
            })
            return res.status(200).send("el usuario fue creado con exito")
        }
        return res.status(400).json({ error: "faltan datos" })
    }catch(e){
    res.json({
      error: e.message
    })
  }
}

const getUserByEmail = async (req, res) => {//ruta para obtener el id por email
    const { email } = req.params;
    try {
        const user = await conn.model('User').findAll( {
            include: {
                model: Post,
                include: Tag
            },
            where: {
                    email:{
                        [Op.like]: email
                        }
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
                    [Op.and]: [
                        {
                            username: {
                                [Op.like]: `%${username.toLowerCase()}%`
                            }
                        },
                        { isActive: true }
                    ]
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
        const { profileImage, description } = req.body
        const [updated] = await conn.model('User').update({
            profileImage: profileImage,
            description: description
        }, { where: { id: id } })

        console.log(`${updated} updated user`);
        return res.status(200).send("Usuario actualizado")
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

module.exports = {
    createUserAuth0,
    getUserByEmail,
    getUserById,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
}

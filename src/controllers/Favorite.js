const { conn, Op } = require('../db')

const saveFavorite = async (req, res) => {
    try {
        const { idUser, idPost } = req.body
        const favorite = await conn.model('Favorite').create({
            idUser: idUser
        })
        const post = await conn.model('Post').findByPk(idPost)
        if (post) {
            post.addFavorite(favorite)
            return res.status(200).send('Post guardado como favorito')
        }
        return res.status(400).send('No se pudo guardar como favorito')
    } catch (error) {
        console.log(error);
        return res.status(200).send(error.message)
    }
}

const getFavoritesByUser = async (req, res) => {
    try {
        const { userId } = req.params
        const favorites = await conn.model('Favorite').findAll({
            include: {
                model: conn.model('Post'),
                include: conn.model('User')
            },
            where: {
                idUser: userId
            }
        })
        return res.status(200).json(favorites)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

const deleteFavorite = async (req, res) => {
    try {
        const { idUser, idPost } = req.query
        const favorite = await conn.model('Favorite').findOne({
            where: {
                [Op.and]: [
                    { PostId: idPost },
                    { idUser: idUser }
                ]
            }
        })
        const post = await conn.model('Post').findByPk(idPost)
        if (favorite && post) {
            post.removeFavorite(favorite)
            await conn.model('Favorite').destroy({
                cascade: true,
                where: {
                    [Op.and]: [{ PostId: idPost }, { idUser: idUser }]
                }
            })
            return res.status(200).send('Post quitado de favoritos')
        }
        return res.status(400).send('No se pudo eliminar de favoritos')
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}
module.exports = {
    saveFavorite,
    getFavoritesByUser,
    deleteFavorite
}
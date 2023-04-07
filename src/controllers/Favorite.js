const { conn } = require('../db')

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
            include: conn.model('Post'),
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

module.exports = {
    saveFavorite,
    getFavoritesByUser
}
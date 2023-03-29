const { conn } = require('../db')

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
        console.log(error);
        return res.status(500).json({ error: 'Hubo un error al consultar el post' })
    }
}

module.exports = getPostById

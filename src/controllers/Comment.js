const { conn } = require("../db");

const saveComment = async (req, res) => {
    try {
        const { userId, postId, comment } = req.body
        const savedComment = await conn.model('Comment').create({
            UserId: userId,
            comment: comment
        })
        const post = await conn.model('Post').findByPk(postId)
        if (post) {
            post.addComment(savedComment)
            return res.status(200).send('Comentario guardado')
        }
        return res.status(400).send('No se pudo guardar el comentario')
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

module.exports = {
    saveComment
}
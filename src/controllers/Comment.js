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

const updateComment = async (req, res) => {
    try {
        const { id } = req.params
        const { comment } = req.body
        const [updated] = await conn.model("Comment").update({
            comment: comment
        }, { where: { id: id } })
        console.log(`${updated} comment updated`);
        return res.status(200).send("Comentario actualizado")
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

const deleteComment = async (req, res) => {
    try {
        const { id, postId } = req.body
        const comment = await conn.model("Comment").findOne({ where: { id: id } })
        const post = await conn.model("Post").findOne({ where: { id: postId } })
        if (comment && post) {
            post.removeComment(comment)
            await comment.destroy()
        }
        return res.status(200).send("Comentario eliminado")
    } catch (error) {
        console.log(error);
        return res.status(200).send(error.message)
    }
}

module.exports = {
    saveComment,
    updateComment,
    deleteComment
}
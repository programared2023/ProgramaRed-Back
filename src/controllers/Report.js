const { conn } = require("../db")

const createReport = async (req, res) => {
    try {
        const { postId, commentId, userId, username, description } = req.body
        let data = { description: description, UserId: userId }
        if (postId) {
            data = {
                ...data,
                PostId: postId
            }
        }
        if (commentId) {
            data = {
                ...data,
                CommentId: commentId
            }
        }
        if (username) {
            data = {
                ...data,
                username: username
            }
        }
        const created = await conn.model("Report").create(data)
        console.log(data, created.toJSON());
        return res.status(200).send("Reporte creado")
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

module.exports = {
    createReport
}
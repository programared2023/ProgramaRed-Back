const { conn } = require("../db");

const saveRating = async (req, res) => {
    try {
        const { postId, userId, vote } = req.body
        const created = await conn.model("Rating").create({
            vote: vote,
            UserId: userId
        })
        const post = await conn.model("Post").findByPk(postId)
        if (post) {
            post.addRating(created)
            return res.status(200).send("Rating guardado")
        }
        return res.status(400).send("No se pudo guardar el rating")
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

const updateRating = async (req, res) => {
    try {
        const { id } = req.params
        const { vote } = req.body
        const [updated] = await conn.model("Rating").update({
            vote: vote
        }, { where: { id: id } })

        console.log(`${updated} ratings updated`);
        return res.status(200).send("Rating actualizado")
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

const getRatingId = async (req, res) => {
    try {
        const { id } = req.params
        const sumCount = await conn.query(`
        SELECT SUM(vote)/COUNT(vote) as rating
        FROM "Posts" p
        INNER JOIN "Ratings" r
        ON p."id"= r."PostId" WHERE p.id =${id}
        `)
        return res.status(200).send(sumCount[0])
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

module.exports = {
    saveRating,
    updateRating,
    getRatingId
}
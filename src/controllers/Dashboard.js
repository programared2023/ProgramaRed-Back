const { conn, Op } = require("../db")

/**
 * POSIBLES CONSULTAS PARA EL DASHBOARD
 *  - Cantidad de usuarios (Usuarios normales vs premium)
    - Cantidad de post por tag
    - Tags más comunes 
 */

/**
 * @param {*} req isPremium (OPTIONAL)
 * @param {*} res countUsers
 * @returns Count of all users, whether is premium or not
 */
const countUsers = async (req, res) => {
    try {
        const { isPremium } = req.query
        const countUsers = await conn.model("User").count({
            where: {
                isPremium: isPremium || false
            }
        })
        return res.status(200).json(countUsers)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

/**
 * @param {*} req tag (OPTIONAL)
 * @param {*} res countPosts
 * @returns countPosts by tag or total posts
 */
const countPostByTag = async (req, res) => {
    try {
        let options = {}
        const { tag } = req.query
        if (tag) {
            options = {
                ...options,
                include: conn.model("Tag"),
                where: {
                    "$Tags.name$": {
                        [Op.like]: `%${tag}%`
                    }
                }
            }
        }
        const countPosts = await conn.model("Post").count(options)
        return res.status(200).json(countPosts)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns All tags with their post count
 */
const commonTags = async (req, res) => {
    try {
        const countTags = await conn.query(`
        SELECT
            t.name as tag,
            count(pt."PostId") as cantidad
        FROM "PostTag" pt
        INNER JOIN "Tags" t on pt."TagId" = t.id
        inner join "Posts" p on pt."PostId" = p.id
        GROUP BY t.name;
        `)
        return res.status(200).json(countTags[0])
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

module.exports = {
    countUsers,
    countPostByTag,
    commonTags
}
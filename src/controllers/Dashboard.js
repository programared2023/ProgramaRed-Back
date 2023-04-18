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

/**
 * 
 * @param {*} req isPremium (OPTIONAL)
 * @param {*} res users
 * @returns All users whether are premium or not
 */
const getUsers = async (req, res) => {
    try {
        const { isPremium } = req.query
        const users = await conn.model("User").findAll({
            attributes: ["id", "username", "email", "isPremium", "isActive"],
            include: [],
            where: {
                isPremium: isPremium || false
            }
        })
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

const unbanUser = async (req, res) => {
    try {
        const { id } = req.params
        const [updated] = await conn.model("User").update({
            isActive: true
        }, { where: { id: id } })
        console.log(`${updated} user marked as active`);
        return res.status(200).send("Usuario desbaneado")
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

const getActiveUsers = async (req, res) => {
    try {
        const { isActive } = req.query
        const users = await conn.model("User").findAll({
            where: {
                isActive: isActive
            }
        })
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

const getReports = async (req, res) => {
    try {
        const reportedUsers = await conn.query(`
            SELECT
                r.username,
                count(r.id) as cantidad
            FROM "Reports" r
                inner JOIN "Users" u on u.id = r."UserId"
            WHERE r.username IS NOT NULL
            GROUP BY r.username;
        `)
        const reportedPosts = await conn.query(`
            SELECT
                p.title as post,
                count(r."PostId") as cantidad
            FROM "Reports" r
                inner JOIN "Posts" p on p.id = r."PostId"
            WHERE r."PostId" IS NOT NULL
            GROUP BY r."PostId", p.title;
        `)
        const reportedComments = await conn.query(`
            SELECT
                c.comment as comentario,
                count(r."CommentId") as cantidad
            FROM "Reports" r
                inner JOIN "Comments" c on c.id = r."CommentId"
            WHERE r."CommentId" IS NOT NULL
            GROUP BY r."CommentId", c.comment;
        `)
        return res.status(200).json(
            {
                reportedUsers: reportedUsers[0],
                reportedPosts: reportedPosts[0],
                reportedComments: reportedComments[0]
            })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

const getAllReports = async (req, res) => {
    try {
        const { search } = req.query
        let options = {
            include: [conn.model("Post"), conn.model("Comment"), conn.model("User")]
        }
        if (search) {
            options = {
                ...options,
                where: {
                    [Op.or]: [
                        {
                            username: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            "$Post.title$": {
                                [Op.iLike]: `%${search}%`
                            }
                        },
                        {
                            "$Comment.comment$": {
                                [Op.iLike]: `%${search}%`
                            }
                        }
                    ]
                }
            }
        }
        const reports = await conn.model("Report").findAll(options)
        return res.status(200).json(reports)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}
const getReportById = async (req, res) => {
    try {
        const { id } = req.params
        const report = await conn.model("Report").findByPk(id, {
            include: [conn.model("User"), conn.model("Post"), conn.model("Comment")]
        })
        if (report) return res.status(200).json(report.toJSON())
        return res.status(400).send("Id incorrecto")
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}
module.exports = {
    countUsers,
    countPostByTag,
    commonTags,
    getUsers,
    unbanUser,
    getActiveUsers,
    getReports,
    getAllReports,
    getReportById
}
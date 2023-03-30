const { conn } = require('../db')

const getAllTags = async (req, res) => {
    try {
        const tags = await conn.model('Tag').findAll()
        return res.status(200).json(tags)
    } catch (error) {
        //console.log(error);
        return res.status(500).send(error.message)
    }
}

module.exports = getAllTags

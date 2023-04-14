const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log("AUTH TOKEN", token);
        jwt.verify(token, process.env.SECRET_AUTH_KEY);
        next();
    } catch {
        res.status(403).send("No autorizado");
    }
};
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
    // GETTING TOKEN FROM HEADER
    const token = req.header('x-auth-token')

    console.log(token)

    // CHECK TOKEN
    if (!token) {
        return res.status(401).json({ errors: [{ msg: "Authorization Denied, No Token Found" }] })
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({ errors: [{ msg: "Token is not valid" }] })
    }
}

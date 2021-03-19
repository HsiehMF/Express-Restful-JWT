const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const userInputToken = req.headers.authorization.split(" ")[1]      // format: Bearer <token>
        const decode = jwt.verify(userInputToken, process.env.JWT_KEY)
        console.log(decode)
    } catch {
        return res.status(401).json({
            message: '尚未登入網站'
        })
    }
    next()
}

const jwt = require('jsonwebtoken')
require('dotenv').config()
const { UserModule } = require('../module/UserModule')


const checkadmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const key = await jwt.verify(token, process.env.secret_key)
        const find = await UserModule.findOne({
            email: key.email
        })
        if (find.type === "admin") {
            next()
        } else {
            return res.status(403).json({
                message: "Unauthorized",
                code: 403
            })
        }
    } catch (err) {
        return res.status(403).json({
            message: "Unauthorized",
            code: 403
        })
    }
}

module.exports = {
    checkadmin
}
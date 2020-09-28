const jwt = require('jsonwebtoken')
const logger = require('../dbConfig/logger')
module.exports.auth = (req, res, next) => {
    var token = req.headers['login_key'];
    console.log("login token check");
    console.log(token)
    if (token) {
        jwt.verify(token, process.env.JWT_LOGIN_KEY, (err, decoded) => {
            if (err) {
                logger.error('invalid token or token has expired')
                return res.send({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                logger.error('note creation failed')
                console.log("verified")
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.send({
            success: false,
            message: 'No token provided.'
        });
    }
}
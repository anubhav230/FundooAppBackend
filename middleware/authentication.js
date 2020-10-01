const jwt = require('jsonwebtoken')
const logger = require('../dbConfig/logger')

const redis = require('redis')
const REDIS_PORT = process.env.PORT || 6379;
const redis_client = redis.createClient(REDIS_PORT);


module.exports.tokenVerify = (req, res, next) => {
    var token = req.headers['login_key'];
    if (token) {
        jwt.verify(token, process.env.JWT_LOGIN_KEY, (err, decoded) => {
            if (err) {
                logger.error('invalid token or token has expired')
                return res.send({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                logger.info('login token has verified')
                console.log("verified")
                req.decoded = decoded.id;
                next();
            }
        });
    } else {
        logger.error('No token provided...')
        return res.send({
            success: false,
            message: 'No token provided.'
        });
    }
}
const jwt = require('jsonwebtoken')

module.exports.auth = (req, res, next) => {
    var token = req.headers['login_key'];
    console.log("login token check");
    if (token) {
        jwt.verify(token, process.env.JWT_LOGIN_KEY, (err, decoded) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
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
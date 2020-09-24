const fundoocontroller = require('../controller/users')
const { check } = require('express-validator');
const controller = new fundoocontroller();

/**
 * @description Exporting routes
 * @param {function} app http requests 
 */
module.exports = (app) => {

    app.post('/register', [check('password', 'min 6 char').isLength({ min: 6 })], controller.register);
    app.post('/login', controller.login);
    app.post('/forgotPassword', controller.forgotPassword);
    app.put('/resetPassword', [check('password', 'min 6 char').isLength({ min: 6 })], controller.resetPassword);
    app.post('/emailVerifyToken', controller.emailVerifyToken)
    app.post('/verify-email', controller.mailverify)

}
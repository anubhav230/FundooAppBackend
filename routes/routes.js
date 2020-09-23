const fundoocontroller = require('../controller/fundooController')
const { check } = require('express-validator');
const controller = new fundoocontroller();

/**
 * @description Exporting routes
 * @param {function} app http requests 
 */
module.exports = (app) => {
    app.post('/register', [check('firstName', 'firstName is required').isEmpty()], controller.register);
    app.post('/login', controller.login);
    app.post('/forgotPassword', controller.forgotPassword);
    app.put('/resetPassword', controller.resetPassword);
    app.post('/mailverify', controller.mailverify)

}
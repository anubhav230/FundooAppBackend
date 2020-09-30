const user = require('../controller/users')
const note = require('../controller/notes')
const tokenVerify = require('../middleware/authentication').tokenVerify
const { check } = require('express-validator');
const checkCache = require('../middleware/checkCache')

const controller = new user();
const noteController = new note();
/**
 * @description Exporting routes
 * @param {function} app http requests 
 */
module.exports = (app) => {

    /****routes for user****/
    app.post('/register', controller.register);
    app.post('/login', controller.login);
    app.post('/forgot-password', controller.forgotPassword);
    app.put('/reset-password', [check('password', 'min 6 char').isLength({ min: 6 })], controller.resetPassword);
    app.post('/email-verifyToken', controller.emailVerifyToken)
    app.post('/verify-email', controller.mailverify)

    /****routes for notes****/
    app.post('/create-note', tokenVerify, noteController.createNote)
    app.post('/get-note', tokenVerify, checkCache.checkCache, noteController.readAllNote)
    app.put('/update-note', tokenVerify, noteController.updateNote)
    app.delete('/delete-note', tokenVerify, noteController.deleteNote)
}
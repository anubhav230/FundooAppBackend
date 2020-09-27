const user = require('../controller/users')
const note = require('../controller/notes')
const middle = require('../middleware/authentication')
const { check } = require('express-validator');
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
    app.post('/create-note', middle.auth, noteController.createNote)
    app.post('/read-note', middle.auth, noteController.readAllNote)
    app.put('/update-note', middle.auth, noteController.updateNote)
        //app.put('/delete-note', noteController.deleteNote)
}
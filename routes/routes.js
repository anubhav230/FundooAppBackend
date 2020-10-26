const user = require('../controller/usersController')
const note = require('../controller/notesController')
const tokenVerify = require('../middleware/authentication').tokenVerify
const { check } = require('express-validator');
const checkCache = require('../middleware/checkCache')
const lable = require('../controller/labelController')
const collaborator = require('../controller/colabController')

const controller = new user();
const noteController = new note();
const lableController = new lable();
const collaboration = new collaborator();
/**
 * @description Exporting routes
 * @param {function} app http requests 
 */
module.exports = (app) => {

    /****routes for user****/
    app.post('/register', controller.register);
    app.post('/login', controller.login);
    app.post('/forgot-password', controller.forgotPassword);
    app.post('/reset-password/token=', controller.resetPassword);
    app.post('/email-verifyToken', controller.emailVerifyToken);
    app.post('/verify-email', controller.mailverify);

    /****routes for notes****/
    app.post('/create-note', tokenVerify, noteController.createNote);
    app.post('/get-note', tokenVerify, noteController.readAllNote);
    app.put('/update-note', tokenVerify, noteController.updateNote);
    app.post('/delete-note', tokenVerify, noteController.deleteNote);
    app.post('/recover-note', tokenVerify, noteController.recoverNote);
    app.post('/delete-forever', tokenVerify, noteController.deleteForever);

    /****routes for notes****/
    app.post('/create-label', tokenVerify, lableController.createLable);
    app.post('/get-label', tokenVerify, lableController.getLabel);
    app.delete('/delete-label', tokenVerify, lableController.deleteLabel);
    app.put('/update-label', tokenVerify, lableController.updateLabel);
    app.put('/add-label', tokenVerify, lableController.addLabel);
    app.put('/remove-label', tokenVerify, lableController.removeLabel);

    /****routs for collaborator****/
    app.post('/search-by-email', collaboration.search);
    app.post('/create-collaborator', collaboration.createCollaborator)
}
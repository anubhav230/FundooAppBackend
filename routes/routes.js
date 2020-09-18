const fundoocontroller = require('../controller/fundooController')

const controller = new fundoocontroller();

/**
 * @description Exporting routes
 * @param {function} app http requests 
 */
module.exports = (app) => {
    app.post('/register', controller.register);
    app.post('/login', controller.login);
}
const fundoocontroller = require('../controller/fundooController')

const controller = new fundoocontroller();

module.exports = (app) => {
    //app.get('/', controller.person);
    app.post('/register', controller.register)
}
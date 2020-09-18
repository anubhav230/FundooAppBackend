const { pool } = require('../dbConfig/dbConfig')
    //const userdb = require('../model/model')
const user = require('../fundooService/service')

const userService = new user();
module.exports = class fundooController {


    register(req, res) {
        const data = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        }
        userService.registration(data).then(() => {
            res.message = 'Successfully registered';
            res.success = true;
            res.status(200).json({ status: 'success', message: 'new user added.', data })
        })

    }
}
const { pool } = require('../dbConfig/dbConfig')
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
            res.status(200).json({ status: 200, message: 'new user added.', data })
        }).catch(err => {
            res.message = 'registration failed. Enter the correct credentials';
            res.status(400).send(res.message + err);
        })

    }

    login(req, res) {
        var response = {
            'success': false,
            'message': 'Something bad happend'
        };
        try {

            if (typeof req.body.email === 'undefined') {
                res.json({ message: 'Mail not found user does\'t exist' });
                throw new Error('undefined email')
            }

            if (typeof req.body.password === 'undefined') {
                res.json({ message: 'undefined passwordt' });
                throw new Error('undefined password')
            }
            const email = req.body.email
            const password = req.body.password
            userService.userlogin(email, password)
                .then(result => {
                    response.message = 'Successfully Logged In';
                    response.success = true;
                    response.data = {
                        'token': result[0],
                        "email": result[1]
                    }
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'Login failed. Enter the correct credentials';
                    res.status(400).send(response, err);
                })

        } catch (error) {
            //response.message = 'Login failed. Enter the correct credentials';
            res.send({ message: "Login failed. Enter the correct credentials" });
        }

    }
}
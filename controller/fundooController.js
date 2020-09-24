const { pool } = require('../dbConfig/dbConfig')
const user = require('../fundooService/service')
const { check, validationResult } = require('express-validator');

const userService = new user();

module.exports = class fundooController {
    /**
     * @Description : registering new user and saving in database
     * @param {object} req 
     * @param {object} res 
     */
    register(req, res) {
        check('email').isEmail()
        check('password', 'password is not valid').isLength({ min: 8 });

        var response = {
            'message': 'Something bad happend',
            'success': false
        }
        try {
            if (typeof req.body.firstName === 'undefined') {
                response.message = "firstName is mendetory"
                console.log(response)
                res.send(response)
            }

            if (typeof req.body.lastName === 'undefined') {
                response.message = "lastName is mendetory"
                console.log(response)
                res.send(response)
            }

            if (typeof req.body.password === 'undefined') {
                response.message = "password is mendetory"
                res.send(response)
            }

            const errors = validationResult(req);

            const data = {
                id: req.body.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
            }
            if (errors.isEmpty()) {
                userService.registration(data).then(() => {
                    res.message = 'Successfully registered';
                    res.success = true;
                    res.status(200).json({ status: 200, message: 'new user added.', data })
                }).catch(err => {
                    res.message = 'registration failed. Enter the correct credentials';
                    res.status(400).send(res.message + err);
                })
            } else {
                console.log(errors)
                response.message = "Prease Enter valid Credentials"
                res.status(401).send(response)
            }
        } catch (error) {
            res.send(response);
        }


    }

    /**
     * @Description : for user login 
     * @param {object} req 
     * @param {object} res 
     */
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
                        'token': result
                    }
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'Login failed. Enter the correct credentials or email is not verifyed';
                    res.status(400).send(response);
                });
        } catch (error) {
            res.send({ message: "Login failed. Enter the correct credentials" });
        }
    }

    /**
     * @Description : forgot password to send link on mail to give a new password 
     * @param {object} req 
     * @param {object} res 
     */
    forgotPassword(req, res) {
        var response = {
            'success': false,
            'message': 'Something bad happend'
        };
        try {
            const mail = req.body.email;
            console.log(mail)
            if (typeof req.body.email === 'undefined') {
                res.json({ message: 'mail not found user does\'t exist' });
                throw new Error('undefined email')
            }
            userService.forgotPassword(mail)
                .then(result => {
                    response.message = 'mail Successfully Sent';
                    response.success = true;
                    response.data = {
                        'token': result
                    }
                    res.status(200).send(response);
                }).catch(err => {
                    response.message = 'reseting password failed Enter the correct credentials' + err;
                    res.status(400).send(response)
                })
        } catch (error) {
            res.send(response, error);
        }
    }


    resetPassword(req, res) {
        var response = {
            'success': false,
            'message': 'Something bad happend'
        };
        try {
            if (typeof req.body.token === 'undefined') {
                res.json({ message: 'please enter token' });
                throw new Error('undefined email')
            }
            let newPassword = req.body.password
            const { token } = req.body
            if (token) {
                userService.resetPassword(newPassword, token)
                    .then(() => {
                        response.message = 'passwored Successfully changed';
                        response.success = true;
                        res.status(200).send(response)
                    }).catch(err => {
                        response.message = 'reseting password failed Enter the correct credentials' + err;
                        res.status(400).send(response)
                    })
            } else {
                response.message = 'please inter toker';
                res.status(400).send(response)
            }
        } catch (error) {
            response.message = 'reseting password failed Enter the correct credentials';
            res.status(400).send(response)
        }

    }


    emailVerifyToken(req, res) {
        var response = {
            'success': false,
            'message': 'Something bad happend'
        };
        try {
            let email = req.body.email;
            if (typeof req.body.email === 'undefined') {
                res.json({ message: 'mail not found user does\'t exist' });
                throw new Error('undefined email')
            }
            userService.emailToken(email)
                .then(result => {
                    response.message = 'mail Successfully Sent';
                    response.success = true;
                    response.data = {
                        'token': result
                    }
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'reseting password failed Enter the correct credentials: ' + err;
                    res.status(400).send(response)
                })
        } catch (error) {
            res.send(response, error);
        }
    }

    mailverify(req, res) {
        var response = {
            'success': false,
            'message': 'Something bad happend',
            'emailFlag': false
        };
        try {
            if (typeof req.body.token === 'undefined') {
                res.json({ message: 'please enter token' });
                throw new Error('undefined email')
            }
            const { token } = req.body
            let email = req.body.email
            if (token) {
                userService.verify(token, email)
                    .then(() => {
                        response.message = 'email verified';
                        response.success = true;
                        response.emailFlag = true;
                        res.status(200).send(response)
                    }).catch(err => {
                        response.message = 'email not verified ' + err;
                        res.status(400).send(response)
                    })
            } else {
                response.message = 'please inter toker';
                res.status(400).send(response)
            }
        } catch (error) {
            response.message = 'email not verified';
            res.status(400).send(response)
        }
    }
}
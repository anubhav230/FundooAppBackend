const User = require("../model/model")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const mailer = require('../fundooService/node_mailer')

module.exports = class UserService {
    /**
     * @Description : registering a new user and saving details in database
     * @param {userData} userData 
     */
    registration(userData) {
        return new Promise((resolve, reject) => {
            let email = userData.email;
            const hash = bcrypt.hashSync(userData.password, 10)
            userData.password = hash
            const mail = {
                email: userData.email
            }
            const token = jwt.sign(mail, process.env.JWT_KEY, { expiresIn: 1440 })
            User.createUser(userData).then(data => {
                if (data) {
                    mailer.mailer(email, token)
                    resolve(data)
                } else {
                    reject("Sorry Unable to register")
                }
            }).catch(err => {
                reject(err)
            });
        });
    }

    /**
     * @Description : for login in user AC with his email and password
     * @param {email} email 
     * @param {password} password 
     */
    userlogin(email, password) {
        return new Promise((resolve, reject) => {
            User.findEmail(email)
                .then(user => {
                    let verifyed = user.dataValues.verifyed
                    const usermail = user.dataValues.email
                    if (verifyed) {
                        if (bcrypt.compareSync(password, user.password)) {
                            const mail = {
                                email: user.dataValues.email
                            }
                            const token = jwt.sign(mail, process.env.JWT_KEY, { expiresIn: 1440 })
                            User.logintoken(token, email)
                                .then(() => {
                                    resolve(token)
                                })
                                .catch(error => {
                                    reject(error)
                                })
                        } else {
                            console.log
                            reject({ error: "Wrong Credentials" })
                        }
                    } else {
                        eject({ error: "Wrong Credentials" })
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * 
     * @param {password} password 
     * @param {token} token 
     */
    resetPassword(password, token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
                if (err) {
                    reject(err)
                }
                const hash = bcrypt.hashSync(password, 10)
                password = hash
                User.resetPasseord(password, token)
                    .then(() => {
                        resolve('success')
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        });
    }

    emailToken(email) {
        return new Promise((resolve, reject) => {
            User.findEmail(email)
                .then(user => {
                    const mail = {
                        email: user.dataValues.email
                    }
                    const token = jwt.sign(mail, process.env.JWT_KEY, { expiresIn: 1440 })
                    console.log(token)
                    User.verificationToken(token, email)
                        .then(() => {
                            mailer.mailer(email, token)
                            resolve(token)
                        }).catch(err => {
                            reject(err)
                        })
                }).catch(err => {
                    console.log('error')
                    console.log(err)
                    reject(err)
                })
        });
    }

    verify(token, email) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
                if (err) {
                    reject(err)
                } else {
                    User.mailVerification(email)
                        .then(() => {
                            token = null
                            User.verificationToken(token, email)
                            resolve('success')
                        })
                        .catch(err => {
                            reject(err)
                        })
                }
            })
        });
    }
}
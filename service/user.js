const User = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const mailer = require('./node_mailer')

module.exports = class UserService {
    /**
     * @Description : registering a new user and saving details in database
     * @param {userData} userData 
     */
    registration(userData) {
        return new Promise((resolve, reject) => {
            let email = userData.email;
            let flag = 'registration'
            const hash = User.hashPassword(userData.password)
            userData.password = hash
            const mail = {
                email: userData.email
            }
            const token = jwt.sign(mail, process.env.JWT_KEY, { expiresIn: '2h' })
            User.createUser(userData).then(data => {
                if (data) {
                    mailer.mailer(email, token, flag)
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
    userlogin(reqbody) {
        return new Promise((resolve, reject) => {
            let email = reqbody.email
            let password = reqbody.password
            let id = reqbody.id
            User.findEmail(email)
                .then(user => {
                    let is_verified = user.dataValues.is_verified
                    console.log(is_verified)
                    if (is_verified) {
                        if (bcrypt.compareSync(password, user.password)) {
                            const data = {
                                email: user.dataValues.email,
                                id: user.dataValues.id
                            }
                            const token = jwt.sign(data, process.env.JWT_LOGIN_KEY)
                            User.login(token, email)
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
                    reject("/////////" + err)
                })
        })
    }

    /**
     * 
     * @param {email} email 
     */
    forgotPassword(email) {
        return new Promise((resolve, reject) => {
            let flag = 'forgotPassword'
            User.findEmail(email)
                .then(user => {
                    const mail = {
                        email: user.dataValues.email
                    }
                    console.log(mail)
                    const tokan = jwt.sign(mail, process.env.JWT_KEY, { expiresIn: 1440 })
                    console.log(tokan)
                    mailer.mailer(email, tokan, flag)
                    resolve(tokan)
                }).catch(err => {
                    reject(err)
                })
        });
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
                const hash = User.hashPassword(password)
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

    /**
     * @Description : for sending token to user for email verification
     * @param {email} token 
     */
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

    /**
     *  @Description : verify user's email AC
     * @param {token} token 
     * @param {email} email 
     */
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
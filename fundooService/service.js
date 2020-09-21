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
            const hash = bcrypt.hashSync(userData.password, 10)
            userData.password = hash
            User.createUser(userData).then(data => {
                if (data) {
                    resolve("Successfull......")
                } else {
                    reject("Sorry Unable to register")
                }
            })

        })
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
                    const usermail = user.dataValues.email
                    if (bcrypt.compareSync(password, user.password)) {
                        const mail = {
                            email: user.dataValues.email
                        }
                        console.log(process.env.JWT_KEY)
                        const tokan = jwt.sign(mail, process.env.JWT_KEY, { expiresIn: 1440 })
                        User.logintoken(tokan, email)
                            .then(() => {
                                resolve(tokan)
                            })
                            .catch(error => {
                                reject(error)
                            })
                    } else {
                        console.log
                        reject({ error: "Wrong password" })
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    forgotPassword(email) {
        console.log('/////////////service')
        return new Promise((resolve, reject) => {
            console.log('/////////////forgotPassword1')
            User.findEmail(email)
                .then(user => {
                    const mail = {
                        email: user.dataValues.email
                    }
                    console.log(mail)
                    const tokan2 = jwt.sign(mail, process.env.JWT_KEY, { expiresIn: 1440 })
                    console.log('/////////////forgotPassword2')
                    console.log(tokan2)
                    mailer.mailer(email, tokan2)
                        .then(() => {
                            console.log('///////////succes')
                            resolve(tokan2)
                        }).catch(err => {
                            reject(err)
                        });
                }).catch(err => {
                    console.log('///////////error')
                    reject(err)
                })
        });
    }
}
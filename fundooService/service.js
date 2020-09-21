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
                        reject({ error: "Wrong password" })
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * @Description : for sending link on user mail to reset password
     * @param {email} email 
     */
    forgotPassword(email) {
        return new Promise((resolve, reject) => {
            User.findEmail(email)
                .then(user => {
                    const mail = {
                        email: user.dataValues.email
                    }
                    console.log(mail)
                    const token = jwt.sign(mail, process.env.JWT_KEY, { expiresIn: 1440 })
                    console.log(token)
                    mailer.mailer(email, token)
                    resolve(token)
                }).catch(err => {
                    console.log('error')
                    console.log(err)
                    reject(err)
                })
        });
    }
}
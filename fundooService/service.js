const User = require("../model/model")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

module.exports = class UserService {

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


    userlogin(email, password) {
        return new Promise((resolve, reject) => {
            User.findEmail(email)
                .then(user => {
                    const usermail = user.dataValues.email
                    console.log("======" + usermail)
                        //console.log(process.env.JWT_KEY)
                    if (bcrypt.compareSync(password, user.password)) {
                        const mail = {
                                email: user.dataValues.email
                            }
                            //console.log(jwt.sign(mail, process.env.JWT_KEY, { expiresIn: 1440 }))
                        const tokan = jwt.sign(mail, process.env.JWT_KEY, { expiresIn: 1440 })
                            //.then(() => {
                        if (tokan !== undefined) {
                            resolve([tokan, usermail])
                        } else {
                            reject(error)
                        }
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}
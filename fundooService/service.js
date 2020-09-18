const User = require("../model/model")

module.exports = class UserService {

    registration(userdata) {
        return new Promise((resolve, reject) => {
            User.createUser(userdata).then(data => {
                if (data) {
                    resolve("Successfull......")
                } else {
                    reject("Sorry Unable to register")
                }
            })

        })
    }
}
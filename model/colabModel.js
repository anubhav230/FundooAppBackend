//const sequelize = require("sequelize");
const note = require('./noteModel');
const userModel = require('./userModel');

module.exports.findUser = (email) => {
    return new Promise((resolve, reject) => {
        userModel.userModel.findOne({
                where: {
                    email: email
                }
            })
            .then(data => {
                console.log(data)
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    })
}
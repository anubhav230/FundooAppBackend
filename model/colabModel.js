//const sequelize = require("sequelize");
const noteModel = require('./noteModel');
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

module.exports.createCollaborator = (userid, noteid) => {
    console.log('///////////////////////from colab model')
    console.log(userid)
    console.log(noteid)
    return new Promise((resolve, reject) => {
        noteModel.noteModel.update({ colabUser: userid }, { where: { id: noteid } }) //create method of sequelize package
            .then(() => {
                resolve("success......fl")
            })
            .catch(err => {
                reject("Error in create collaborator", err)
            })
    })
}
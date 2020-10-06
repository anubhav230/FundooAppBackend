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

module.exports.createCollaborator = (userId, noteId) => {
    console.log('///////////////////////from colab model')
    console.log(userId)
    console.log(noteId)
    return new Promise((resolve, reject) => {
        noteModel.noteModel.update({ colabUser: userId }, { where: { id: noteId } }) //create method of sequelize package
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject("Error in create collaborator", err)
            })
    })
}
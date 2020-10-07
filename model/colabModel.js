//const sequelize = require("sequelize");
const noteModel = require('./noteModel');
const userModel = require('./userModel');


const sequelize = require('sequelize');
const db = require('../dbConfig/dbConfig');

module.exports.colabModel = db.sequelize.define('collaborators', {

    userId: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    noteId: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    },
    updatedAt: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    }
});


module.exports.createCollaborator = (data) => {
    return new Promise((resolve, reject) => {
        this.colabModel.create(data)
            .then(user => {
                resolve(user)
            })
            .catch(err => {
                reject(err)
            });
    });
}

module.exports.findUser = (email) => {
    console.log('//////findUser')
    return new Promise((resolve, reject) => {
        userModel.userModel.findOne({
                where: {
                    emailId: email
                }
            })
            .then(data => {
                resolve(data.id)
            })
            .catch(err => {
                reject(err)
            })
    })
}





// module.exports.createCollaborator = (userId, noteId) => {
//     console.log("////// userid" + userId)
//     console.log(noteId)
//     return new Promise((resolve, reject) => {
//         noteModel.noteModel.update({ colabUser: userId }, { where: { id: noteId } }) //create method of sequelize package
//             .then(data => {
//                 resolve(data)
//             })
//             .catch(err => {
//                 reject("Error in create collaborator", err)
//             });
//     });
// }
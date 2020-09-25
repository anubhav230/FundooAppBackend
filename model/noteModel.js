const sequelize = require('sequelize');
const db = require('../dbConfig/dbConfig');

module.exports.userModel = db.sequelize.define('notes', {

    title: {
        type: sequelize.STRING,
        allowNull: false
    },
    description: {
        type: sequelize.STRING,
        defaultValue: null
    },
    is_pinned: {
        type: sequelize.BOOLEAN,
        defaultValue: false
    },
    remainder: {
        type: sequelize.STRING,
        defaultValue: null
    },
    noteColor: {
        type: sequelize.STRING,
        defaultValue: null
    },
    is_archived: {
        type: sequelize.BOOLEAN,
        defaultValue: false
    },
    is_delete: {
        type: sequelize.BOOLEAN,
        defaultValue: false
    }

});
/**
 * @description for saving note details in database
 * @param {userData} userData 
 */
module.exports.createNote = (userData) => {
    return new Promise((resolve, reject) => {
        this.userModel.create(userData) //create method of sequelize
            .then(user => {
                resolve(user)
            })
            .catch(err => {
                reject(err)
            })
    })
}
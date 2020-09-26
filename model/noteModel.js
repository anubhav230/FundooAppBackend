const sequelize = require('sequelize');
const db = require('../dbConfig/dbConfig');

module.exports.noteModel = db.sequelize.define('notes', {

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
        this.noteModel.create(userData) //create method of sequelize
            .then(user => {
                resolve(user)
            })
            .catch(err => {
                reject(err)
            });
    });
}

/**
 * @description for reading all nots of user
 * @param {userData} userData 
 */
module.exports.getAllNote = (id) => {
    return this.noteModel.findAll({
        where: {
            id: id //checking if the userid sent by client is present in the db(valid)
        }
    })
}

module.exports.UpdateNote = (notData, noteId) => {
    return new Promise((resolve, reject) => {
        this.noteModel.update({ description: notData }, { where: { note_id: noteId } })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    });
}
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
    isPinned: {
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
    isArchived: {
        type: sequelize.BOOLEAN,
        defaultValue: false
    },
    isDelete: {
        type: sequelize.BOOLEAN,
        defaultValue: false
    },
    userId: {
        type: sequelize.STRING,
        allowNull: false
    }
});

/**
 * @description for saving note details in database
 * @param {userData} userData 
 */
module.exports.createNote = (userData) => {
    console.log(userData)
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
module.exports.getAllNote = (userId) => {
    return this.noteModel.findAll({
        where: {
            userId: userId //checking if the userid sent by client is present in the db(valid)
        }
    });
}

/**
 * @description user can update not with note_id
 * @param {notData} notData 
 * @param {noteId} noteId 
 */
module.exports.UpdateNote = (notData, noteId) => {
    return new Promise((resolve, reject) => {
        this.noteModel.update({ description: notData }, { where: { id: noteId } })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    });
}

/**
 * @description finding note in db with note_id
 * @param {note_id} note_id 
 */
module.exports.findNote = (note_id) => {
    return this.noteModel.findOne({
        where: {
            id: note_id //checking if the email address sent by client is present in the db(valid)
        }
    });
}

/**
 * @description if node is present in db then delete that particular note
 * @param {note_id} note_id 
 */
module.exports.delete = (note_id) => {
    return new Promise((resolve, reject) => {
        this.findNote(note_id) // Check requested note is present or not in db
            .then((data) => {
                if (data.length != 0) {
                    this.noteModel.destroy({ // If Present then delete by note id it using destroy() of sequelize
                            where: { id: note_id }
                        })
                        .then(result => {
                            resolve(result)
                        })
                        .catch(error => {
                            reject(error)
                        })
                } else {
                    reject("Sorry Some issue come in deleting the note: ")
                }
            })
            .catch(err => {
                reject("Sorry no such note found: ", err)
            })
    })
}
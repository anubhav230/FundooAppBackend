const user = require('../model/userModel');
const note = require('../model/noteModel');


module.exports = class NoteService {

    /**
     * @description finding user id and creating new note
     * @param {noteData} noteData note data
     * @param {login_key} login_key for getting userid from user table
     */
    createNote(noteData, login_key) {
        return new Promise((resolve, reject) => {
            user.finduser(login_key)
                .then(id => {
                    noteData['id'] = id;
                    console.log(noteData)
                    note.createNote(noteData)
                        .then(noteData => {
                            resolve(noteData)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
                .catch(err => {
                    reject('unable to create note: ' + err)
                })
        });
    }
}
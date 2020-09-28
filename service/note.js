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
            console.log(login_key)
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

    /**
     * @description reading all notes
     * @param {reqbody} reqbody 
     */
    readAllNote(token) {
        return new Promise((resolve, reject) => {
            user.finduser(token)
                .then(id => {
                    note.getAllNote(id)
                        .then(data => {
                            resolve(data)
                        })
                        .catch(err => {
                            reject('error' + err)
                        })
                })
                .catch(errr => {
                    reject(errr)
                })
        });
    }

    updateNote(notedata, noteId) {
        return new Promise((resolve, reject) => {
            note.UpdateNote(notedata, noteId)
                .then(data => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        });
    }
}
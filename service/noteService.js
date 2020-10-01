const Lable = require('../controller/labelController');
const note = require('../model/noteModel');


module.exports = class NoteService {
    /**
     * @description finding user id and creating new note
     * @param {noteData} noteData note data
     */
    createNote(noteData) {
        return new Promise((resolve, reject) => {
            Lable.createNote(noteData)
                .then(noteData => {
                    resolve(noteData)
                })
                .catch(err => {
                    reject(err)
                })
        });
    }

    /**
     * @description reading all notes
     * @param {reqbody} reqbody 
     */
    readAllNote(user_id) {
        return new Promise((resolve, reject) => {
            note.getAllNote(user_id)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject('error' + err)
                })
        })
    }

    /**
     * @description service function for updating note with note_id
     * @param {notedata} notedata 
     * @param {noteId} noteId 
     */
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

    /**
     * @description service function for deleting note by note_id
     * @param {note_id} note_id 
     */
    deleteNote(note_id) {
        return new Promise((resolve, reject) => {
            note.delete(note_id)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject('error: ' + err)
                })
        });
    }
}
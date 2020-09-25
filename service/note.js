const user = require('../model/userModel');
const note = require('../model/noteModel');


module.exports = class NoteService {

    createNote(noteData, login_key) {
        return new Promise((resolve, reject) => {
            user.finduser(login_key)
                .then(id => {
                    noteData['id'] = id;
                    console.log(noteData)
                    note.createUser(noteData)
                        .then(noteData => {
                            resolve(noteData)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
                .catch(err => {
                    reject('Sorry unable to create note: ' + err)
                })

        });
    }
}
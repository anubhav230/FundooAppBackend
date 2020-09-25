const { pool } = require('../dbConfig/dbConfig');
const note = require('../service/note');

const noteService = new note();

module.exports = class Note {

    createNote = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            let login_key = req.body.login_key
            const noteData = {
                title: req.body.title,
                description: req.body.description,
                is_pined: req.body.is_pined,
                remainder: req.body.remainder,
                noteColor: req.body.noteColor,
                is_archived: req.body.is_archived,
                is_delete: req.body.is_delete,
            }
            noteService.createNote(noteData, login_key)
                .then(() => {
                    response.message = 'Successfully note created';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'note creation failed' + err;
                    res.status(400).send(response);
                });
        } catch (error) {
            response.message = "Title and Content should not be empty" + error
            res.status(400).send(response);
        }

    }
}
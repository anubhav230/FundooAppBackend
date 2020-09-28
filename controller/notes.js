const { pool } = require('../dbConfig/dbConfig');
const note = require('../service/note');
const logger = require('../dbConfig/logger')

const noteService = new note();

module.exports = class Note {

    /**
     * @description this will create new note for user
     * @param {req} req 
     * @param {res} res 
     */
    createNote = (req, res) => {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            let login_key = req.headers.login_key
            console.log(login_key)
            const noteData = {
                title: req.body.title,
                description: req.body.description,
                is_pinned: req.body.is_pined,
                remainder: req.body.remainder,
                noteColor: req.body.noteColor,
                is_archived: req.body.is_archived,
                is_delete: req.body.is_delete,
            }

            noteService.createNote(noteData, login_key)
                .then(() => {
                    logger.info("congrats You Are Successsfully created the note");
                    response.message = 'Successfully note created';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    logger.error('note creation failed')
                    response.message = 'note creation failed: ' + err;
                    res.status(400).send(response);
                });
        } catch (error) {
            response.message = "Title and Content should not be empty" + error
            logger.error(response.message)
            res.status(400).send(response);
        }
    }

    /**
     * @description for reading all notes
     * @param {req} req 
     * @param {res} res 
     */
    readAllNote(req, res) {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            let login_key = req.headers.login_key
            noteService.readAllNote(login_key)
                .then(data => {
                    logger.info("congrats You Are Successsfully read all note......");
                    response.message = 'Successsfully read all note......';
                    response.success = true;
                    response.data = data
                    res.status(200).send(response);
                })
                .catch(err => {
                    logger.error('Some issue in reading notes')
                    response.message = 'Some issue in reading notes' + err;
                    res.status(400).send(response);
                })
        } catch (error) {
            response.message = "Some issue in reading notes" + error
            logger.error(response.message);
            res.status(400).send(response);
        }
    }

    updateNote(req, res) {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            let notObj = {
                title: req.body.title,
                description: req.body.description,
                is_pinned: req.body.is_pined,
                remainder: req.body.remainder,
                noteColor: req.body.noteColor,
                is_archived: req.body.is_archived,
                is_delete: req.body.is_delete,
            }
            let notedata = req.body.description
            let noteId = req.body.note_id
            noteService.updateNote(notedata, noteId)
                .then(() => {
                    logger.info("congrats You Are Successsfully updated the note");
                    response.message = 'Successfully updated';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'updetion failed. ' + err;
                    logger.error(response.message);
                    res.status(400).send(response);
                })
        } catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

    deleteNote(req, res) {

    }
}
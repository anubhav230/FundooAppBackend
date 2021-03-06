const { pool } = require('../dbConfig/dbConfig');
const note = require('../service/noteService');
const logger = require('../dbConfig/logger')
const cache = require('../middleware/checkCache')
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
        console.log(req.decoded)

        try {
            if (typeof req.body.title === 'undefined') {
                response.message = "title is mendetory"
                console.log(response)
                res.send(response)
            }

            const noteData = {
                title: req.body.title,
                description: req.body.description,
                is_pinned: req.body.is_pined,
                remainder: req.body.remainder,
                noteColor: req.body.noteColor,
                is_archived: req.body.is_archived,
                is_delete: req.body.is_delete,
                userId: req.decoded
            }

            noteService.createNote(noteData)
                .then(() => {
                    cache.deleteCache(req.decoded)
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
        console.log('get notes from controller')
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            //let login_key = req.headers.login_key
            let user_id = req.decoded
            console.log(user_id)
            noteService.readAllNote(user_id)
                .then(data => {
                    cache.loadCache(req.decoded, data)
                    logger.info("congrats You Are Successsfully read all note......");
                    response.message = 'Successsfully read all note......';
                    response.success = true;
                    response.data = data
                    res.status(200).send(response);
                })
                .catch(err => {
                    logger.error('Some issue in reading notes: ')
                    response.message = 'Some issue in reading notes: ' + err;
                    res.status(400).send(response);
                })
        } catch (error) {
            response.message = "Some issue in reading notes: " + error
            logger.error(response.message);
            res.status(400).send(response);
        }
    }

    /**
     * @description controller for update note
     * @param {req} req 
     * @param {res} res 
     */
    updateNote(req, res) {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            let notedata = req.body.description
            let noteId = req.body.id
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

    /**
     * @description controller for deleting note
     * @param {req} req 
     * @param {res} res 
     */
    deleteNote(req, res) {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const note_id = req.body.id
            noteService.deleteNote(note_id)
                .then(() => {
                    logger.info("Successsfully deleted the note");
                    response.message = 'Successfully deleted';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'deletion failed. Some issue in deleting the note';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        } catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }
    deleteForever(req, res) {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const note_id = req.body.id
            noteService.deleteForever(note_id)
                .then(() => {
                    logger.info("Successsfully deleted the note");
                    response.message = 'Successfully deleted';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'deletion failed. Some issue in deleting the note';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        } catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

    recoverNote(req, res) {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const note_id = req.body.id
            noteService.recoverNote(note_id)
                .then(() => {
                    logger.info("Successsfully recovered");
                    response.message = 'Successsfully recovered';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'deletion failed. Some issue in recovering the note';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        } catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

}
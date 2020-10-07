const collabService = require('../service/colabService')
const logger = require('../dbConfig/logger')

const colabService = new collabService();

module.exports = class CollabController {

    /**
     * @description function for searching user
     * @param {req} req 
     * @param {res} res 
     */
    search(req, res) {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            let email = req.body.email
            colabService.search(email)
                .then((data) => {
                    logger.info("Search Result Found");
                    response.message = 'Search Result Found';
                    response.success = true;
                    response.data = {
                        "data": data
                    }
                    res.status(200).send(response);
                })
                .catch(err => {
                    logger.error(response.message + err)
                    response.message = 'No result found, there is no such email registered: ' + err;
                    res.status(400).send(response)
                })
        } catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }

    /**
     * @description function for adding collabotators
     * @param {req} req 
     * @param {res} res 
     */
    createCollaborator(req, res) {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            console.log(req.body.email)
            console.log(req.body.noteId)
            const email = req.body.email
            const noteId = req.body.noteId
            colabService.createCollaborator(email, noteId)
                .then(() => {
                    logger.info("congrats You Are Successsfully set Collaborator");
                    response.message = 'collaborator set';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'Some issu is colaboration: ' + err;
                    logger.error(response.message + err)
                    res.status(400).send(response)
                })
        } catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }
}
const logger = require('../dbConfig/logger');
const lable = require('../service/labelService');

const labelService = new lable();
module.exports = class Lable {

    /**
     * @description controller for creating labels
     * @param {req} req 
     * @param {res} res 
     */
    createLable(req, res) {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            const labelData = {
                labelName: req.body.labelName,
                userId: req.decoded
            }
            labelService.createLabel(labelData)
                .then(() => {
                    logger.info("congrats You Are Successsfully created the label");
                    response.message = 'label successfully created';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    logger.error('label creation failed')
                    response.message = 'label creation failed: ' + err;
                    res.status(400).send(response);
                });
        } catch (error) {
            response.message = "labelName and Content should not be empty" + error
            logger.error(response.message)
            res.status(400).send(response);
        }
    }

    /**
     * @description controller for getting all labels
     * @param {req} req 
     * @param {res} res 
     */
    getLabel(req, res) {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            labelService.readLabel(req.decoded)
                .then(data => {
                    logger.info("congrats You Are Successsfully read all labels......");
                    response.message = 'Successsfully read all labels......';
                    response.success = true;
                    response.data = data
                    res.status(200).send(response);
                })
                .catch(err => {
                    logger.error('Some issue in reading labels: ')
                    response.message = 'Some issue in reading labels: ' + err;
                    res.status(400).send(response);
                })
        } catch (error) {
            response.message = "Some issue in reading label: " + error
            logger.error(response.message)
            res.status(400).send(response);
        }
    }

    /**
     * @description controller for deleting  labels
     * @param {req} req 
     * @param {res} res 
     */
    deleteLabel(req, res) {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        //console.log(req.body.id)
        try {
            labelService.deleteNote(req.body)
                .then(() => {
                    logger.info("Successsfully deleted the label");
                    response.message = 'Successfully deleted';
                    response.success = true;
                    res.status(200).send(response);
                })
                .catch(err => {
                    response.message = 'deletion failed. Some issue in deleting the label';
                    logger.error(response.message + err)
                    res.status(400).send(response);
                })
        } catch (error) {
            response.message = "Some issue in deleting label: " + error
            logger.error(response.message)
            res.status(400).send(response);
        }
    }

    /**
     * @description controller for updating labels
     * @param {req} req 
     * @param {res} res 
     */
    updateLabel(req, res) {
        let response = {
            'message': 'Something bad happend',
            'success': false
        };
        try {
            let labelName = req.body.labelName;
            let id = req.body.id
            console.log(req.body.labelName)
            labelService.updateLabel(labelName, id)
                .then(() => {
                    logger.info("congrats You Are Successsfully updated the label");
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
}
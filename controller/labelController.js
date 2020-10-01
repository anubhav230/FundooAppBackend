const logger = require('../dbConfig/logger');
const lable = require('../service/labelService');

const labelService = new lable();
module.exports = class Lable {

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

        }
    }
}
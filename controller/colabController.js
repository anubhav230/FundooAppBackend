const collabService = require('../service/colabService')
const logger = require('../dbConfig/logger')

const colabService = new collabService()

module.exports = class CollabController {

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
                    console.log(data)
                    response.data = {
                        "data": data
                    }
                    res.status(200).send(response);
                })
                .catch(err => {
                    logger.error(response.message + err)
                    response.message = 'No result found, there is no such email registered' + err;
                    res.status(400).send(response)
                })
        } catch (error) {
            logger.error(response.message + error);
            res.send(response);
        }
    }
}
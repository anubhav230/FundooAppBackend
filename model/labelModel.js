const sequelize = require('sequelize');
const db = require('../dbConfig/dbConfig');

module.exports.labelModel = db.sequelize.define('labels', {

    labelName: {
        type: sequelize.STRING,
        defaultValue: null
    },
    userId: {
        type: sequelize.INTEGER
    }
});


module.exports.createLabel = (labelData) => {
    console.log(labelData)
    console.log('//////////from labelmodel')
    return new Promise((resolve, reject) => {
        this.labelModel.create(labelData) //create method of sequelize
            .then(user => {
                resolve(user)
            })
            .catch(err => {
                reject(err)
            });
    });
}

module.exports.readLabel = (userId) => {
    return this.labelModel.findAll({
        where: {
            userId: userId //checking if the userid sent by client is present in the db(valid)
        }
    });
}
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

// module.exports = class LableOperetions {

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
    // }
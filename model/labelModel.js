const sequelize = require('sequelize');
const db = require('../dbConfig/dbConfig');

module.exports.labelModel = db.sequelize.define('labels', {

    labelName: {
        type: sequelize.STRING,
        defaultValue: null
    },
    createdAt: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    },
    updatedAt: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    },
    userId: {
        type: sequelize.INTEGER
    }
});

/**
 * @description fuction for creating label
 * @param {labelData} labelData 
 */
module.exports.createLabel = (labelData) => {
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

/**
 * @description function for get all labels
 * @param {userId} userId 
 */
module.exports.readLabel = (userId) => {
    return this.labelModel.findAll({
        where: {
            userId: userId //checking if the userid sent by client is present in the db(valid)
        }
    });
}

/**
 * @description fuction for finding a label
 * @param {labelId} labelId 
 */
module.exports.findlebal = (labelId) => {
    return this.labelModel.findOne({
        where: {
            id: labelId //checking if the email address sent by client is present in the db(valid)
        }
    });
}

/**
 * @description function for updating label
 * @param {labelName} labelName 
 * @param {id} id 
 */
module.exports.updateLabel = (labelName, id) => {
    return new Promise((resolve, reject) => {
        this.labelModel.update({ labelName: labelName }, { where: { id: id } })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    });
}

/**
 * @description fuction for deleting a label
 * @param {labelId} labelId 
 */
module.exports.delete = (labelId) => {
    return new Promise((resolve, reject) => {
        this.findlebal(labelId) // Check requested note is present or not in db
            .then((data) => {
                if (data.length != 0) {
                    this.labelModel.destroy({ // If Present then delete by note id it using destroy() of sequelize
                            where: { id: labelId }
                        })
                        .then(result => {
                            resolve(result)
                        })
                        .catch(error => {
                            reject(error)
                        })
                } else {
                    reject("Sorry Some issue come in deleting the label: ")
                }
            })
            .catch(err => {
                reject("Sorry no such label found: ", err)
            })
    })
}
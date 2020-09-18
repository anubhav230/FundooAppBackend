const { Cipher } = require('crypto');
const sequelize = require('sequelize');
const db = require('../dbConfig/dbConfig')

module.exports.userModel = db.sequelize.define('user', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncriment: true
    },
    firstName: {
        type: sequelize.STRING
    },
    lastName: {
        type: sequelize.STRING
    },
    email: {
        type: sequelize.STRING
    },
    password: {
        type: sequelize.STRING
    },
});

/**
 * @Description : for registering new user
 * @param {userData} userData 
 */
module.exports.createUser = (userData) => {
    return new Promise((resolve, reject) => {
        this.userModel.create(userData)
            .then(user => {
                resolve(user)
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports.findEmail = (email) => {
    return this.userModel.findOne({ //findOne method of sequelize package
        where: {
            email: email //checking if the email address sent by client is present in the db(valid)
        }
    })
}
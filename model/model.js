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
 * @Description : for registering  new user
 * @param {userData} userData 
 */
module.exports.createUser = (userData) => {
    return new Promise((resolve, reject) => {
        this.userModel.create(userData) //create method of sequelize package
            .then(user => {
                resolve(user)
            })
            .catch(err => {
                reject(err)
            })
    })
}
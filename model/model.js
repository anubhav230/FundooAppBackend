const { Cipher } = require('crypto');
const sequelize = require('sequelize');
const db = require('../dbConfig/dbConfig')

module.exports.userModel = db.sequelize.define('user', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncriment: true

    },
    firstName: {
        type: sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    logintoken: {
        type: sequelize.STRING
    }
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

/**
 * @Description : for finding user mail id in database for login access
 * @param {email} email 
 */
module.exports.findEmail = (email) => {
    return this.userModel.findOne({ //findOne method of sequelize package
        where: {
            email: email
        }
    });
}

/**
 * @Description : for updating JWT tokan in database whenever user trying to login 
 * @param {logintoken} logintoken 
 * @param {email} email 
 */
module.exports.logintoken = (logintoken, email) => {
    return this.userModel.update({ logintoken: logintoken }, { where: { email: email } })
}
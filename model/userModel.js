const { Cipher } = require('crypto');
const sequelize = require('sequelize');
const db = require('../dbConfig/dbConfig')
const bcrypt = require("bcrypt")

module.exports.userModel = db.sequelize.define('user', {

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
    passToken: {
        type: sequelize.STRING
    },
    verificationToken: {
        type: sequelize.STRING
    },
    verifyed: {
        type: sequelize.BOOLEAN
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
        }).then(res => {
            return res;
        });
    }
    /**
     * @Description : for updating JWT tokan in database whenever user trying to login 
     * @param {logintoken} logintoken 
     * @param {email} email 
     */
module.exports.login = (passToken, email) => { //
    return this.userModel.update({ passToken: passToken }, { where: { email: email } })
}

/**
 * @Description : for updating JWT tokan in database whenever user trying to verify email 
 * @param {verificationToken} verificationToken 
 * @param {email} email 
 */
module.exports.verificationToken = (verificationToken, email) => {
    return this.userModel.update({ verificationToken: verificationToken }, { where: { email: email } })
}

/**
 * @Description : for removing  JWT tokan from database after user's AC is verified 
 * @param {email} email 
 */
module.exports.mailVerification = (email) => {
    return this.userModel.update({ verifyed: true }, { where: { email: email } })
}

/**
 * @Description : for resting password 
 * @param {emapasswordil} password
 * @param {passToken} passToken  
 */
module.exports.resetPasseord = (password, passToken) => {
    return this.userModel.update({ password: password }, { where: { passToken: passToken } })
}

/**
 * @Description : password hashing 
 * @param {password} password
 */
module.exports.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10)
}
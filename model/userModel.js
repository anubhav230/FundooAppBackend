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
    isVerified: {
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
    // module.exports.login = (login_key, email) => { //
    //     return this.userModel.update({ login_key: login_key }, { where: { email: email } })
    // }

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
    console.log('from is varified')
    return this.userModel.update({ is_verified: true }, { where: { email: email } })
}

/**
 * @Description : for resting password 
 * @param {emapasswordil} password
 * @param {passToken} passToken  
 */
module.exports.resetPasseord = (password, login_key) => {
    return this.userModel.update({ password: password }, { where: { login_key: login_key } })
}

/**
 * @Description : password hashing 
 * @param {password} password
 */
module.exports.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10)
}

module.exports.finduser = (login_key) => {
    return new Promise((resolve, reject) => {
        this.userModel.findOne({
                where: {
                    login_key: login_key
                }
            })
            .then((data) => {
                resolve(data.dataValues.id)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
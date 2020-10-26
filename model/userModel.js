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
    emailId: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    },
    updatedAt: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
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
    console.log('//////from model')

    return new Promise((resolve, reject) => {
        console.log(userData)
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
            emailId: email
        }
    }).then(res => {
        return res;
    });
}

/**
 * @Description : for updating JWT tokan in database whenever user trying to verify email 
 * @param {verificationToken} verificationToken 
 * @param {email} email 
 */
module.exports.verificationToken = (verificationToken, email) => {
    return this.userModel.update({ verificationToken: verificationToken }, { where: { emailId: email } })
}

/**
 * @Description : for removing  JWT tokan from database after user's AC is verified 
 * @param {email} email 
 */
module.exports.mailVerification = (email) => {
    console.log('from is varified')
    return this.userModel.update({ isVerified: true }, { where: { emailId: email } })
}

/**
 * @Description : for resting password 
 * @param {emapasswordil} password
 * @param {passToken} passToken  
 */
module.exports.resetPasseord = (password, emailId) => {
    return this.userModel.update({ password: password }, { where: { emailId: emailId } })
}

/**
 * @Description : password hashing 
 * @param {password} password
 */
module.exports.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10)
}

// module.exports.finduser = (email) => {
//     return new Promise((resolve, reject) => {
//         this.userModel.findOne({
//                 where: {
//                     email: email
//                 }
//             })
//             .then((data) => {
//                 resolve(data.dataValues.id)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }
const sequelize = require('sequelize');
const db = require('../dbConfig/dbConfig');

var noteModel = db.sequelize.define('labels', {

    label: {
        type: sequelize.STRING,
        defaultValue: null
    },
    createdAt: {
        type: sequelize.NOW,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: sequelize.NOW,
        defaultValue: Sequelize.NOW
    },
    noteId: {
        type: sequelize.INTEGER,
    }

});

class LableOperetions {

}
const Sequelize = require("sequelize")
const db = {}
const sequelize = new Sequelize('fundooApp', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;
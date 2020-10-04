const Sequelize = require("sequelize")
const db = {}
const sequelize = new Sequelize('fundooApp', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    });

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;
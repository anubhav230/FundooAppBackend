const express = require('express');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator');
const cors = require('cors')
const logger = require('./dbConfig/logger')
    // const redis = require('redis')
    //const { pool } = require('./dbConfig/dbConfig')
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

const PORT = process.env.PORT || 4000;


require('./routes/routes.js')(app);

// const clint = redis.createClient(REDIS_PORT)
// module.exports = clint
app.listen(PORT, () => {
    //logger.log('info', `Server is listening on port ${PORT}`)
    console.log(`Server is listening on port ${PORT}`)
});
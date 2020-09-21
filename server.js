const express = require('express');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator');
const cors = require('cors')

//const { pool } = require('./dbConfig/dbConfig')
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

const PORT = process.env.PORT || 4000;

require('./routes/routes.js')(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const { pool } = require('./dbConfig/dbConfig')
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const person = (request, response) => {
    //console.log("j")
    pool.query('SELECT * FROM public."user"', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}


const addperson = (request, response) => {
    const { name, email, password } = request.body

    pool.query(
        'INSERT INTO public."user" (name, email, password) VALUES ($1, $2, $3)', [name, email, password],
        (error) => {
            if (error) {
                throw error
            }
            response.status(201).json({ status: 'success', message: 'Book added.' })
        },
    )
}




const PORT = process.env.PORT || 4000;



app
    .route('/')
    // GET endpoint
    .get(person)
    // POST endpoint
    .post(addperson)

//require('./routes/routes')(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
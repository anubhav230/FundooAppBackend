module.exports = class fundooController {
    person(request, response) {
        pool.query('SELECT * FROM public."user"', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }

}
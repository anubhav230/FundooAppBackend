const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;
const clint = redis.createClient(REDIS_PORT)

/**
 * @description function for loading data form cache memory
 * @param {req} req 
 * @param {res} res 
 * @param {next} next 
 */
module.exports.checkCache = (req, res, next) => {
    const id = req.headers.login_key
    clint.get(id, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        //if no match found
        if (data != null) {
            console.log('loading data from redis')
            res.send(data);
        } else {
            //proceed to next middleware function
            next();
        }
    });
};

/**
 * @description fuction for loading data in cache memory
 * @param {data} data 
 * @param {login_key} login_key 
 */
module.exports.loadCache = (data, login_key) => {
    clint.setex(login_key, 10, JSON.stringify(data));
}
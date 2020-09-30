const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;
const redis_client = redis.createClient(REDIS_PORT)

/**
 * @description function for loading data form cache memory
 * @param {req} req 
 * @param {res} res 
 * @param {next} next 
 */
module.exports.checkCache = (req, res, next) => {
    console.log(req.decoded)
    redis_client.get(`notes : ${req.decoded}`, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        if (data != null) {
            console.log('loading data from redis')
            res.send(data);
        } else {
            next();
        }
    });
};

/**
 * @description fuction for loading data in cache memory
 * @param {data} data 
 * @param {login_key} login_key 
 */
module.exports.loadCache = (user_id, data) => {
    redis_client.set(`notes : ${user_id}`, JSON.stringify(data));
}

module.exports.deleteCache = (userId) => {
    redis_client.del(`notes : ${userId}`, JSON.stringify({
        from: "cache memory",
    }), (err, data) => {
        if (err) {
            console.log("eroor");
        } else {
            console.log("deleted", data)
        }
    })
}
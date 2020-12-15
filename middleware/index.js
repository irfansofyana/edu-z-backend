const jwtAuth = require('./auth');

const response_generator = (statusCode, results, res) => {
    res.statusCode = statusCode;
    res.json(results);
}

const result_controller = (response, results) => {
    return {
        "status": response,
        "data": results
    }
}

module.exports = {response_generator, result_controller, jwtAuth};
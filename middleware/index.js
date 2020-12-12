const response_generator = (statusCode, results, res) => {
    res.statusCode = statusCode;
    res.json(results);
}

module.exports = response_generator;
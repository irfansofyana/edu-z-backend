const config = require('../config');
const jwt = require('jsonwebtoken');

const notAllowed = (res, statusCode, message) => {
    const data = {
        'status' : message,
        'data': null
    }
    res.statusCode = statusCode;
    res.json(data);
}

const authenticateJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const verified = jwt.verify(token, config.SECRET);

            if (verified) {
                req.user = verified;
                next();
            }
        } else {
            notAllowed(res, 401, "UNAUTHORIZED");
        }

    } catch (err) {
        notAllowed(res, 403, "FORBIDDEN")
    }
}

module.exports = authenticateJWT;
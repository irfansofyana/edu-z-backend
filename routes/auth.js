const express = require('express');
const router = express.Router();
const {signinUser, signupUser} = require('../controllers/auth');
const {response_generator} = require('../middleware');

router.post('/signup', async(req, res) => {
    const {is_teacher, ...data} = req.body;
    const message = await signupUser(is_teacher, data);
    
    let statusCode = 200;
    if (message.status === "USERNAME OR EMAIL ALREADY IN USE") {
        statusCode = 400;
    } else if (message.status === "ERROR") {
        statusCode = 500;
    }

    return response_generator(statusCode, message, res);
});

router.post('/signin', async (req, res) => {
    const {is_teacher, username, password} = req.body;
    const message = await signinUser(is_teacher, username, password);

    let statusCode = 200;
    if (message.status === "UNAUTHORIZED") {
        statusCode = 401;
    } else if (message.status === "ERROR") {
        statusCode = 500;
    } 

    return response_generator(statusCode, message, res);
});


module.exports = router;
const express = require('express');
const router = express.Router();
const {signupStudent, signupTeacher, signinStudent, signinTeacher} = require('../controllers/auth');
const {response_generator} = require('../middleware');

router.post('/signup/teacher', async(req, res) => {
    const message = await signupTeacher(req.body);
    
    let statusCode = 200;
    if (message.status === "USERNAME OR EMAIL ALREADY IN USE") {
        statusCode = 400;
    } else if (message.status === "ERROR") {
        statusCode = 500;
    }

    return response_generator(statusCode, message, res);
});

router.post('/signup/student', async(req, res) => {
    const message = await signupStudent(req.body);
    
    let statusCode = 200;
    if (message.status === "USERNAME OR EMAIL ALREADY IN USE") {
        statusCode = 400;
    } else if (message.status === "ERROR") {
        statusCode = 500;
    }

    return response_generator(statusCode, message, res);
});

router.post('/signin/teacher', async (req, res) => {
    const {username, password} = req.body;
    const message = await signinTeacher(username, password);

    let statusCode = 200;
    if (message.status === "UNAUTHORIZED") {
        statusCode = 401;
    } else if (message.status === "ERROR") {
        statusCode = 500;
    } 

    return response_generator(statusCode, message, res);
});

router.post('/signin/student', async (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);
    const message = await signinStudent(username, password);

    let statusCode = 200;
    if (message.status === "UNAUTHORIZED") {
        statusCode = 401;
    } else if (message.status === "ERROR") {
        statusCode = 500;
    } 

    return response_generator(statusCode, message, res);
});

module.exports = router;
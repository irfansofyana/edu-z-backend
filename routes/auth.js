const express = require('express');
const router = express.Router();
const {signupStudent, signupTeacher, signinStudent, signinTeacher} = require('../controllers/auth');
const {response_generator} = require('../middleware');
const {emailHelper} = require('../helper');
const {addSecretCode, getSecretCode} = require('../controllers/secretcode');
const {getStudentsById, updateStatusStudent} = require('../controllers/students');
const {getTeacherById, updateStatusTeacher} = require('../controllers/teachers');
const randomstring = require('randomstring');
const {HOST, PORT} = require('../config');

router.post('/signup/teacher', async(req, res) => {
    const message = await signupTeacher(req.body);
    
    let statusCode = 200;
    if (message.status === "USERNAME OR EMAIL ALREADY IN USE") {
        statusCode = 400;
    } else if (message.status === "ERROR") {
        statusCode = 500;
    }
    if (statusCode == 200) {
        const newUserEmail = req.body.email;
        const userId = message.data._id;
        const data = {
            'email': newUserEmail,
            'code': randomstring.generate(),
            'accountType': 'Teacher'
        }
        const secretCodeMessage = await addSecretCode(data);
        const linkForVerify = `${HOST}:${PORT}/auth/verify/teacher/${userId}/${data.code}`
        emailHelper(newUserEmail, linkForVerify)
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

    if (statusCode == 200) {
        const newUserEmail = req.body.email;
        const userId = message.data._id;
        const data = {
            'email': newUserEmail,
            'code': randomstring.generate(),
            'accountType': 'Student'
        }
        const secretCodeMessage = await addSecretCode(data);
        const linkForVerify = `${HOST}:${PORT}/auth/verify/student/${userId}/${data.code}`
        emailHelper(newUserEmail, linkForVerify)
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

router.get('/verify/student/:student_id/:secret_code', async (req, res) => {
    const studentId = req.params.student_id;
    const secretCode = req.params.secretCode;

    const student = await getStudentsById(studentId);
    if (student.status == "OK") {
        const emailStudent = student.data.email;
        const secretCodeFound = await getSecretCode(emailStudent, 'Student');
        if (secretCodeFound.code == secretCode) {
            const updatedStudent = await updateStatusStudent(studentId);
            // Success!
            res.redirect('/');
        } else {
            return response_generator(400, null, res);
        }
    } else {
        return response_generator(500, null, res);
    }
});

router.get('/verify/teacher/:teacher_id/:secret_code', async (req, res) => {
    const teacherId = req.params.teacher_id;
    const secretCode = req.params.secretCode;

    const teacher = await getTeacherById(teacherId);
    if (teacher.status == "OK") {
        const emailTeacher = teacher.data.email;
        const secretCodeFound = await getSecretCode(emailTeacher, 'Teacher');
        if (secretCodeFound.code == secretCode) {
            const updatedTeacher = await updateStatusTeacher(studentId);
            // Success!
            res.redirect('/');
        } else {
            return response_generator(400, null, res);
        }
    } else {
        return response_generator(500, null, res);
    }
});

module.exports = router;
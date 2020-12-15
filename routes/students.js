const express = require('express');
const { route } = require('.');
const router = express.Router();

const {
    getAllStudents,
    getStudentsById,
    createStudent,
    updateStudentsById,
    deleteStudentsById,
    getStudentByUsernameAndPassword
} = require('../controllers/students');
const {response_generator} = require('../middleware');

router.get('/', async (req, res) => {
    const message = await getAllStudents();
    const statusCode = message.status == "OK" ? 200 : 500;
    return response_generator(statusCode, message, res);
});

router.get('/:student_id', async (req, res) => {
    const studentsId = req.params.student_id;
    const message = await getStudentsById(studentsId);
    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

router.post('/username', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const message = await getStudentByUsernameAndPassword(username, password);
    const statusCode = message.status == "OK" ? 200:500;

    return response_generator(statusCode, message, res);
});

router.post('/', async (req, res) => {
    const students = req.body;
    const message = await createStudent(students);
    const statusCode = message.status == "OK" ? 200 : 500;
   
    return response_generator(statusCode, message, res);
});

router.put('/:student_id', async (req, res) => {
    const students = req.body;
    const studentsId = req.params.student_id;

    const message = await updateStudentsById(studentsId, students);
    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

router.delete('/:student_id', async (req, res) => {
    const studentsId = req.params.student_id;
    const message = await deleteStudentsById(studentsId);

    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

module.exports = router;
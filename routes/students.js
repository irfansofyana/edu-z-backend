const express = require('express');
const router = express.Router();

const {
    getAllStudents,
    getStudentsById,
    createStudents,
    updateStudentsById,
    deleteStudentsById
} = require('../controllers/students');
const {response_generator} = require('../middleware');

router.get('/', async (req, res) => {
    const message = await getAllStudents();
    const statusCode = message.status == "OK" ? 200 : 500;
    return response_generator(statusCode, message, res);
});

router.get('/:students_id', async (req, res) => {
    const studentsId = req.params.student_id;
    const message = await getStudentsById(studentsId);
    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

router.post('/', async (req, res) => {
    const students = req.body;
    const message = await createStudents(students);
    const statusCode = message.status == "OK" ? 200 : 500;
   
    return response_generator(statusCode, message, res);
});

router.put('/:student_id', async (req, res) => {
    const students = req.body;
    const studentsId = req.params.students_id;

    const message = await updateStudentsById(studentsId, students);
    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

router.delete('/:student_id', async (req, res) => {
    const studentsId = req.params.students_id;
    const message = await deleteStudentsById(studentsId);

    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

module.exports = router;
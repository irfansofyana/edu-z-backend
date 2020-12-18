const express = require('express');
const { route } = require('.');
const router = express.Router();

const {
    getAllStudents,
    getStudentsById,
    createStudent,
    updateStudentsById,
    deleteStudentsById,
    getStudentByUsernameAndPassword,
    getAllEnrolledClass,
    getEnrolledClassById
} = require('../controllers/students');

const {response_generator} = require('../middleware');

/**
 * Get all students
 */
router.get('/', async (req, res) => {
    const message = await getAllStudents();
    const statusCode = message.status == "OK" ? 200 : 500;
    return response_generator(statusCode, message, res);
});

/**
 * Get student by id
 */
router.get('/:student_id', async (req, res) => {
    const studentsId = req.params.student_id;
    const message = await getStudentsById(studentsId);
    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

/**
 * Get all classes from a certain student
 */
router.get('/:student_id/classes', async (req, res) => {
    const studentId = req.params.student_id
    const message = await getAllEnrolledClass(studentId)

    const statusCode = message.status == "OK" ? 200 : 500
    return response_generator(statusCode, message, res)
});

/**
 * Get specific class from a certain student
 */
router.get('/:student_id/registeredClasses/:class_id', async (req, res) => {
    const studentId = req.params.student_id
    const classId = req.params.class_id
    const message = await getEnrolledClassById(studentId, classId)

    const statusCode = message.status == "OK" ? 200 : 500
    return response_generator(statusCode, message, res)
})

/**
 * Get student by username and password
 */
router.post('/username', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const message = await getStudentByUsernameAndPassword(username, password);
    const statusCode = message.status == "OK" ? 200:500;

    return response_generator(statusCode, message, res);
});

/**
 * Create a student
 */
router.post('/', async (req, res) => {
    const students = req.body;
    const message = await createStudent(students);
    const statusCode = message.status == "OK" ? 200 : 500;

    return response_generator(statusCode, message, res);
});

/**
 * Update a certain student
 */
router.put('/:student_id', async (req, res) => {
    const students = req.body;
    const studentsId = req.params.student_id;

    const message = await updateStudentsById(studentsId, students);
    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

/**
 * Delete a certain student
 */
router.delete('/:student_id', async (req, res) => {
    const studentsId = req.params.student_id;
    const message = await deleteStudentsById(studentsId);

    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});


module.exports = router;
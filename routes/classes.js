//Class: id, name, description, owner, [lessons], [member], [feedbacks]
const express = require('express');
const router = express.Router();

const {
    getAllClasses,
    getClassesById,
    createClasses,
    updateClassesById,
    deleteClassesById,
    addLessonToClass,
    getAllLessons,
    getClassLessonById,
    deleteClassLesson
} = require('../controllers/classes');
const {response_generator} = require('../middleware');

router.get('/', async (req,res) => {
    const message = await getAllClasses();
    const statusCode = message.status == "OK" ? 200 : 500;
    return response_generator(statusCode, message, res);
});

router.get('/:class_id', async (req, res) => {
    const classesId = req.params.class_id;

    const message = await getClassesById(classesId);
    const statusCode = message.status == "OK" ? 200 : 500;

    return response_generator(statusCode, message, res);
});

router.post('/', async (req, res) => {
    const classes = req.body;

    const message = await createClasses(classes);
    const statusCode = message.status == "OK" ? 200 : 500;

    return response_generator(statusCode, message, res);
});

router.post('/lessons', async (req, res) => {
    const classId = req.body.class_id;
    const lessonId = req.body.lesson_id;

    const message = await addLessonToClass(classId, lessonId);
    const statusCode = message.status == "OK" ? 200 : 500;

    return response_generator(statusCode, message, res);
});

router.get('/:class_id/lessons', async (req, res) => {
    const message = await getAllLessons(req.params.class_id);
    const statusCode = message.status == "OK" ? 200 : 500;

    return response_generator(statusCode, message, res);
});

router.get('/:class_id/lessons/:lesson_id', async (req, res) => {
    const classId = req.params.class_id;
    const lessonId = req.params.lesson_id;

    const message = await getClassLessonById(classId, lessonId);
    const statusCode = message.status == "OK" ? 200 : 500;

    return response_generator(statusCode, message, res);
});

router.put('/:class_id', async (req, res) => {
    const classes = req.body;
    const classesId = req.params.class_id;

    const message = await updateClassesById(classesId, classes);
    const statusCode = message.status == "OK" ? 200 : 500;

    return response_generator(statusCode, message, res);
});

router.put('/:class_id/lessons/:lesson_id', async (req, res) => {
    const classId = req.params.class_id;
    const lessonId = req.params.lesson_id;
    
    const message = await deleteClassLesson(classId, lessonId);
    const statusCode = message.status == "OK" ? 200 : 500;

    return response_generator(statusCode, message, res);
});

router.delete('/:class_id', async (req, res) => {
    const classesId = req.params.class_id;

    const message = await deleteClassesById(classesId);
    const statusCode = message.status == "OK" ? 200 : 500;

    return response_generator(statusCode, message, res);
});

module.exports = router;
const express = require('express');
const router = express.Router();

const {
    getAllLessons, 
    getLessonById, 
    createLesson,
    updateLessonById,
    deleteLessonById
} = require('../controllers/lessons');
const {response_generator} = require('../middleware');

router.get('/', async (req, res) => {
    const message = await getAllLessons();
    const statusCode = message.status == "OK" ? 200 : 500;
    return response_generator(statusCode, message, res);
});

router.get('/:lesson_id', async (req, res) => {
    const lessonId = req.params.lesson_id;
    const message = await getLessonById(lessonId);
    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

router.post('/', async (req, res) => {
    const lesson = req.body;
    const message = await createLesson(lesson);
    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

router.put('/:lesson_id', async (req, res) => {
    const lesson = req.body;
    const lessonId = req.params.lesson_id;

    const message = await updateLessonById(lessonId, lesson);
    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

router.delete('/:lesson_id', async (req, res) => {
    const lessonId = req.params.lesson_id;
    const message = await deleteLessonById(lessonId);

    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

module.exports = router;
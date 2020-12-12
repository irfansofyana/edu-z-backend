const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const Lessons = require('../models/lessons');
const {getAllLessons, getLessonsById} = require('../controllers/lessons');
const response_generator = require('../middleware');

router.get('/', (req, res) => {
    const message = getAllLessons();
    return response_generator(200, message, res);
});

router.get('/:lesson_id', (req, res) => {
    const message = getLessonsById(req.params.lesson_id)
    return response_generator(200, message, res);
});

router.put('/:lesson_id', (req, res) => {
    const message = {
        "status": "OK",
        "data": [
            {
                "name": "data-01",
                "description": "example of data 1"
            }
        ]
    }
    return response_generator(200, message, res);
});

router.delete('/', (req, res) => {
    const message = {
        "status": "OK",
        "data": [
            {
                "name": "data-01",
                "description": "example of data 1"
            }
        ]
    }
    return response_generator(200, message, res);
});

router.delete('/:lesson_id', (req, res) => {
    const message = {
        "status": "OK",
        "data": [
            {
                "name": "data-01",
                "description": "example of data 1"
            }
        ]
    }
    return response_generator(200, message, res);
});

module.exports = router;
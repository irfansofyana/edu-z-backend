//Class: id, name, description, owner, [lessons], [member], [feedbacks]
const express = require('express');
const router = express.Router();

const {
    getAllClasses,
    getClassesById,
    createClasses,
    updateClassesById,
    deleteClassesById
} = require('../controllers/classes');
const {response_generator} = require('../middleware');

router.get('/', async (req,res) => {
    const message = await getAllClasses();
    const statusCode = message.status == "OK" ? 200 : 500;
    return response_generator(statusCode, message, res);
});

router.get('/:classes_id', async (req, res) => {
    const classesId = req.params.classes_id;
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

router.put('/:classes_id', async (req, res) => {
    const classes = req.body;
    const classesId = req.params.classes_id;

    const message = await updateClassesById(classesId, classes);
    const statusCode = message.status == "OK" ? 200 : 500;

    return response_generator(statusCode, message, res);
});

router.delete('/:classes_id', async (req, res) => {
    const classesId = req.params.classes_id;
    const message = await deleteClassesById(classesId);

    const statusCode = message.status == "OK" ? 200 : 500;

    return response_generator(statusCode, message, res);
});



module.exports = router;
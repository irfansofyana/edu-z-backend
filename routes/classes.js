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

const {
    getAllClassDiscussion,
    getClassDiscussionById,
    addClassDiscussion,
    updateClassDiscussion,
    deleteClassDiscussion
} = require('../controllers/discussions')

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

//Discussion
router.get('/:classId/discussions', async (req, res) => {
    let classId = req.params.classId
    const data = await getAllClassDiscussion(classId)
    const stat = data.status == "OK" ? 200 : 500

    return response_generator(stat, data, res)
})

router.get('/:classId/discussions/:discussionId', async (req, res) => {
    let classId = req.params.classId
    let discId = req.params.discussionId
    const data = await getClassDiscussionById(classId, discId)
    const stat = data.status == "OK" ? 200 : 500

    return response_generator(stat, data, res)
})


router.post('/:classId/discussions', async(req, res) => {
    let discussion = req.body
    let classId = req.params.classId
    const data = await addClassDiscussion(discussion, classId)
    const stat = data.status == "OK" ? 200 : 500
    
    return response_generator(stat, data, res)
})

router.put('/:classId/discussions/:discussionId', async (req, res) => {
    let classId = req.params.classId
    let discId = req.params.discussionId
    let discussion = req.body
    const data = await updateClassDiscussion(classId, discId, discussion)
    const stat = data.status == "OK" ? 200 : 500

    return response_generator(stat, data, res)
})

router.delete('/:classId/discussions/:discussionId', async (req, res) => {
    let classId = req.params.classId
    let discId = req.params.discussionId
    const data = await deleteClassDiscussion(classId, discId)
    const stat = data.status == "OK" ? 200 : 500

    return response_generator(stat, data, res)
})

module.exports = router;
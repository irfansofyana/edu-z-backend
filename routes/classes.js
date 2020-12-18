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
    deleteClassLesson,
    getAllClassMember,
    getClassMemberById,
    addClassMember,
    deleteClassMember
} = require('../controllers/classes');

const {
    getAllClassDiscussion,
    getClassDiscussionById,
    addClassDiscussion,
    updateClassDiscussion,
    deleteClassDiscussion
} = require('../controllers/discussions')

const {
    getAllEnrolledClass,
    getEnrolledClassById,
    enrollClass,
    unEnrollClass
} = require('../controllers/students')

const {addClassToTeacher, deleteTeacherClass} = require('../controllers/teachers');

const {response_generator} = require('../middleware');

/**
 * Get all classes
 */
router.get('/', async (req,res) => {
    const message = await getAllClasses();
    const statusCode = message.status == "OK" ? 200 : 500;
    return response_generator(statusCode, message, res);
});

/**
 * Get class by class_id
 */
router.get('/:class_id', async (req, res) => {
    const classesId = req.params.class_id;

    const message = await getClassesById(classesId);
    const statusCode = message.status == "OK" ? 200 : 500;

    return response_generator(statusCode, message, res);
});

/**
 * Create a class
 */
router.post('/', async (req, res) => {
    const classes = req.body;

    const message = await createClasses(classes);
    const addedClass = await addClassToTeacher(req.body.owner, message.data._id); 

    const statusCode = message.status == "OK" && addedClass.status == "OK" ? 200 : 500;

    return response_generator(statusCode, (statusCode == 500 ? null : message), res);
});

/**
 * Add lesson to a certain class
 */
router.post('/lessons', async (req, res) => {
    const classId = req.body.class_id;
    const lessonId = req.body.lesson_id;

    const message = await addLessonToClass(classId, lessonId);
    const statusCode = message.status == "OK" ? 200 : 500;

    return response_generator(statusCode, message, res);
});

/**
 * Add member to a certain class
 */
router.post('/members', async (req, res) => {
    const student_id = req.body.student_id
    const class_id = req.body.class_id
    const message = await enrollClass(student_id, class_id)
    const message2 = await addClassMember(class_id, student_id)

    const statusCode = message.status && message2.status == "OK" ? 200 : 500
    return response_generator(statusCode, message, res)
});

/**
 * Get all lessons of a certain class
 */
router.get('/:class_id/lessons', async (req, res) => {
    const message = await getAllLessons(req.params.class_id);
    const statusCode = message.status == "OK" ? 200 : 500;

    return response_generator(statusCode, message, res);
});

/**
 * Get detail lesson of a certain class
 */
router.get('/:class_id/lessons/:lesson_id', async (req, res) => {
    const classId = req.params.class_id;
    const lessonId = req.params.lesson_id;

    const message = await getClassLessonById(classId, lessonId);
    const statusCode = message.status == "OK" ? 200 : 500;

    return response_generator(statusCode, message, res);
});

/**
 * Get all members of a certain class
 */
router.get('/:class_id/members', async (req, res) => {
    const classId = req.params.class_id
    const message = await getAllClassMember(classId)
    
    const statusCode = message.status == "OK" ? 200 : 500

    return response_generator(statusCode, message, res)
});

/**
 * Get a single member from a certain class
 */
router.get('/:class_id/members/:student_id', async (req, res) => {
    const classId = req.params.class_id
    const studentId = req.params.student_id
    const message = await getClassMemberById(classId, studentId)

    const statusCode = message.status == "OK" ? 200 : 500

    return response_generator(statusCode, message, res)
})

/**
 * Update class by its id
 */
router.put('/:class_id', async (req, res) => {
    const classes = req.body;
    const classesId = req.params.class_id;

    const message = await updateClassesById(classesId, classes);
    const statusCode = message.status == "OK" ? 200 : 500;

    return response_generator(statusCode, message, res);
});

/**
 * Delete a certain student from a certain class
 */
router.put('/:class_id/members/:student_id', async (req, res) => {
    const student_id = req.params.student_id
    const class_id = req.params.class_id
    const message = await unEnrollClass(student_id, class_id)
    const message2 = await deleteClassMember(class_id, student_id)

    const statusCode  = message.status && message2.status == "OK" ? 200 : 500
    return response_generator(statusCode, message, res)
})

/**
 * Delete a certain lesson from a certain class
 */
router.put('/:class_id/lessons/:lesson_id', async (req, res) => {
    const classId = req.params.class_id;
    const lessonId = req.params.lesson_id;
    
    const message = await deleteClassLesson(classId, lessonId);
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

/**
 * Delete a class
 */
router.delete('/:class_id', async (req, res) => {
    const classesId = req.params.class_id;

    const message = await deleteClassesById(classesId);
    let deletedClass;
    if (message.status == "OK") {
        const teacherId = message.data.owner;
        deletedClass = await deleteTeacherClass(teacherId, classesId);
    }
    const statusCode = message.status == "OK" && deletedClass.status == "OK" ? 200 : 500;

    return response_generator(statusCode, (statusCode == 500 ? null : message), res);
});

module.exports = router;
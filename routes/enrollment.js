const express = require('express')
const router = express.Router()
const {response_generator} = require('../middleware');
const {
    getAllEnrolledClass,
    getEnrolledClassById,
    enrollClass,
    unEnrollClass
} = require('../controllers/students')

const {
    getAllClassMember,
    getClassMemberById,
    addClassMember,
    deleteClassMember
} = require('../controllers/classes')

//Enrollment
router.post('/classes', async (req, res) => {
    const student_id = req.body.student_id
    const class_id = req.body.class_id
    const message = await enrollClass(student_id, class_id)
    const message2 = await addClassMember(class_id, student_id)

    const statusCode = message.status && message2.status == "OK" ? 200 : 500
    return response_generator(statusCode, message, res)
})

//unEnrollment
router.put('/classes', async (req, res) => {
    const student_id = req.body.student_id
    const class_id = req.body.class_id
    const message = await unEnrollClass(student_id, class_id)
    const message2 = await deleteClassMember(class_id, student_id)

    const statusCode  = message.status && message2.status == "OK" ? 200 : 500
    return response_generator(statusCode, message, res)
})

//get all enrolled classes from a student
router.get('/classes/:student_id', async (req, res) => {
    const student_id = req.params.student_id
    const message = await getAllEnrolledClass(student_id)

    const statusCode = message.status == "OK" ? 200 : 500
    return response_generator(statusCode, message, res)
})
//get a single enrolled class from a student(with classId)
router.get('/classes/:student_id/:class_id', async (req, res) => {
    const student_id = req.params.student_id
    const class_id = req.params.class_id
    const message = await getEnrolledClassById(student_id, class_id)

    const statusCode = message.status == "OK" ? 200 : 500
    return response_generator(statusCode, message, res)
})


//get all class member
router.get('/member/:class_id', async (req, res) => {
    const class_id = req.params.class_id
    const message = await getAllClassMember(class_id)
    
    const statusCode = message.status == "OK" ? 200 : 500

    return response_generator(statusCode, message, res)
})
//get a single member from a class(with studentId)
router.get('/member/:class_id/:student_id', async (req, res) => {
    const class_id = req.params.class_id
    const student_id = req.params.student_id
    const message = await getClassMemberById(class_id, student_id)

    const statusCode = message.status == "OK" ? 200 : 500

    return response_generator(statusCode, message, res)
})


module.exports = router
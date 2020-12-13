const router = require('express').Router()

const{
    getAllTeachers,
    createTeacher,
    updateTeacherById,
    deleteAllTeacher,
    deleteTeacherById,
    getTeaceherById
} = require("../controllers/teachers")
const {response_generator} = require('../middleware')

router.get('/', async(req, res) => {
    const data = await getAllTeachers()
    const stat = data.status =="OK" ? 200 : 500
    
    return response_generator(stat, data, res)
})

router.post('/', async(req, res) => {
    const data = await createTeacher(req.body)
    const stat = data.status =="OK" ? 200 : 500
    
    return response_generator(stat, data, res)
})

router.delete('/', async(req, res) => {
    const data = await deleteAllTeacher()
    const stat = data.status == "OK" ? 200 : 500

    return response_generator(stat, data, res)
})

router.get('/:teacher_id', async (req, res) => {
    const data = await getTeaceherById(req.params.teacher_id)
    const stat = data.status == "OK" ? 200 : 500
    
    return response_generator(stat, data, res)
})

router.put('/:teacher_id', async (req, res) => {
    const data = await updateTeacherById(req.params.teacher_id, req.body)
    const stat = data.status == "OK" ? 200 : 500

    return response_generator(stat, data, res)
})

router.delete('/:teacher_id', async (req, res) => {
    const data = await deleteTeacherById(req.params.teacher_id)
    const stat = data.status == "OK" ? 200 : 500

    return response_generator(stat, data, res)
})

module.exports = router
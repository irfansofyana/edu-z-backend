const router = require('express').Router()

const{
    getAllTeachers,
    createTeacher
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

module.exports = router
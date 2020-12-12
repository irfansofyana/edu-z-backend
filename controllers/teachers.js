const Teachers = require('../models/teachers')
const {result_controller} = require('../middleware')


const getAllTeachers = async () => {
    try {
        const data = await Teachers.find({}).exec()
        return result_controller("OK", data)
    } catch (error) {
        console.log(error)
        return result_controller("ERROR", null)
    }
}

const createTeacher = async (body) => {
    try {
        const data = await Teachers.create(body)
        return result_controller("OK", data)
    } catch (error) {
        console.log(error)
        return result_controller("ERROR", null)
    }
}

module.exports = {
    getAllTeachers,
    createTeacher
}
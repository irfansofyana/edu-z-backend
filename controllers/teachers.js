const Teachers = require('../models/teachers')
const {result_controller} = require('../middleware')


const getAllTeachers = async () => {
    try {
        const data = await Teachers.find({}).exec()
        return result_controller("OK", data)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const getTeaceherById = async  (id) => {
    try {
        const data = await Teachers.findById(id).exec()
        return result_controller("OK", data)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const createTeacher = async (body) => {
    try {
        const data = await Teachers.create(body)
        return result_controller("OK", data)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const updateTeacherById = async (id, data) => {
    try {
        const updatedData = await Teachers.findByIdAndUpdate(id, {$set: data}, {new: true}).exec()
        return result_controller("OK", updatedData)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const deleteAllTeacher = async() => {
    try {
        const data = await Teachers.deleteMany({}).exec()
        return result_controller("OK", data)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const deleteTeacherById = async (id) => {
    try {
        const data = await Teachers.findByIdAndRemove(id).exec()
        return result_controller("OK", data)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

module.exports = {
    getAllTeachers,
    getTeaceherById,
    createTeacher,
    updateTeacherById,
    deleteAllTeacher,
    deleteTeacherById
}
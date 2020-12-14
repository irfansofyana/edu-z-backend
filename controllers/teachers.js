const Teachers = require('../models/teachers')
const bcrypt = require('bcrypt')
const {result_controller} = require('../middleware')

const round = 10  
const salt = bcrypt.genSaltSync(round)


const getAllTeachers = async () => {
    try {
        const data = await Teachers.find({}).exec()
        return result_controller("OK", data)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const getTeacherById = async  (id) => {
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
        //password hashing
        let hashed = bcrypt.hashSync(body.password, salt)
        body.password = hashed
        
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

const getTeacherByUsernameAndPassword = async (username, password) => {
    try {
        const teacher = await Teachers.findOne({username: username}).exec();
        let data = teacher;
        
        if (!bcrypt.compareSync(password, teacher.password)) {
           data = null;
        }

        return result_controller("OK", data);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

module.exports = {
    getAllTeachers,
    getTeacherById,
    createTeacher,
    updateTeacherById,
    deleteAllTeacher,
    deleteTeacherById,
    getTeacherByUsernameAndPassword
}
const Students = require('../models/students');
const {result_controller} = require('../middleware');
const bcrypt = require('bcrypt');
const salt = 10;

const getAllStudents = async () => {
    try {
        const students = await Students.find({}).exec();
        return result_controller("OK", students);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const getStudentsById = async (id) => {
    try {
        const students = await Students.findById(id).exec();
        return result_controller("OK", students);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const createStudents = async (body) => {
    try {
        //password hashing
        let hashed = bcrypt.hashSync(body.password, salt)
        body.password = hashed
        
        const data = await Students.create(body)
        return result_controller("OK", data)
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const updateStudentsById = async (id, updatedData) => {
    try {
        const updatedStudents = await Students.findByIdAndUpdate(id, {$set: updatedData}, {new: true}).exec();
        return result_controller("OK", updatedStudents);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const deleteStudentsById = async (id) => {
    try {
        const deletedStudents = await Students.findByIdAndDelete(id).exec();
        return result_controller("OK", deletedStudents);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

module.exports = {
    getAllStudents,
    getStudentsById,
    createStudents,
    updateStudentsById,
    deleteStudentsById
}
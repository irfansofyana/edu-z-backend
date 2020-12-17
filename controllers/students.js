const Students = require('../models/students');
const {result_controller} = require('../middleware');
const bcrypt = require('bcrypt');
const Mongoose = require('mongoose');
const { model } = require('../models/students');
const { path } = require('../app');

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

const createStudent = async (body) => {
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

const getStudentByUsernameAndPassword = async (username, password) => {
    try {
        const student = await Students.findOne({username: username}).exec();
        let data = student;
        
        if (!bcrypt.compareSync(password, student.password)) {
            data = null;
        }

        return result_controller("OK", data);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}
// CLASS ENROLLMENT

const getAllEnrolledClass = async (studentId) => {
    try {
        const listEnrolledClass = await Students.findById(studentId).populate({path: "registeredClass", model: "Classes"})
        return result_controller("OK", listEnrolledClass)

    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

//get single data of enrolled class by a student
const getEnrolledClassById = async (studentId, classId) => {
    
    try {
        const enrolledClass = await Students.findById(studentId)
            .populate({path: "registeredClass", 
            model: "Classes",
            match: {_id: classId}
            })
        return result_controller("OK", enrolledClass.registeredClass)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
    

}

const enrollClass = async (studentId, classId) => {
    try {
        const classObjectId = Mongoose.Types.ObjectId(classId)
        
        const enrolledClass = await Students.findByIdAndUpdate(studentId, 
            {$push : {registeredClass : classObjectId} }, {new: true})
        
        return result_controller("OK", enrolledClass)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
} // end func

const unEnrollClass = async (studentId, classId) => {
    try {
        const classObjectId = Mongoose.Types.ObjectId(classId)
        
        const enrolledClass = await Students.findByIdAndUpdate(studentId, 
            {$pull : {registeredClass : classObjectId} }, {new: true})
        
        return result_controller("OK", enrolledClass)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
} // end func

module.exports = {
    getAllStudents,
    getStudentsById,
    createStudent,
    updateStudentsById,
    deleteStudentsById,
    getStudentByUsernameAndPassword,
    getAllEnrolledClass,
    getEnrolledClassById,
    enrollClass,
    unEnrollClass
}
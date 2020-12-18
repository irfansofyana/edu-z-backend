const Teachers = require('../models/teachers')
const bcrypt = require('bcrypt')
const {result_controller} = require('../middleware')
const Mongoose = require('mongoose')

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

const addClassToTeacher = async (teacherId, classId) => {
    try {
        const classObjectId = Mongoose.Types.ObjectId(classId);

        const ownedClass = await Teachers.findByIdAndUpdate(
            teacherId,
            {$push: {ownedClass : classObjectId}},
            {new: true}
        );

        return result_controller("OK", ownedClass);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const getAllOwnedClass = async (teacherId) => {
    try {
        const ownedClass = await (
            Teachers.findById(teacherId)
                .populate({path: "classes", model: "Classes"})
        );
        return result_controller("OK", ownedClass)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const getTeacherLessonById = async (teacherId, classId) => {
    try {
        const teacher = await Teachers
            .findById(teacherId)
            .populate({
                path: "classes",
                model: "Classes",
                match: {_id: classId}
            });
        return result_controller("OK", teacher.ownedClass)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const deleteTeacherClass = async (teacherId, classId) => {
    try {
        const classObjectId = Mongoose.Types.ObjectId(classId)
        
        const deletedClass = await Teachers.findByIdAndUpdate(
            teacherId, 
            {$pull : {ownedClass : classObjectId} }, 
            {new: true}
        );
        
        return result_controller("OK", deletedClass)
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const updateStatusTeacher = async (teacherId) => {
    try {
        const updatedTeacher = await Teachers.findByIdAndUpdate(
            teacherId,
            {status: "verified"}
        ).exec();
        return result_controller("OK", updatedTeacher);
    } catch(err) {
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
    getTeacherByUsernameAndPassword,
    addClassToTeacher,
    getAllOwnedClass,
    getTeacherLessonById,
    deleteTeacherClass,
    updateStatusTeacher
}
const Classes = require('../models/classes');
const {result_controller} = require('../middleware');
const Mongoose = require('mongoose')
const { model } = require('../models/classes');
const { path } = require('../app');

const getAllClasses = async () => {
    try {
        const classes = await Classes.find({}).exec();
        return result_controller("OK", classes); 
    }catch (err) {
        console.log(err);
        return result_controller("ERROR", null);
    }
}

const getClassesById = async (id) => {
    try {
        const classes = await Classes.findById(id).exec();
        return result_controller("OK", classes);
    } catch (err) {
        console.log(err);
        return result_controller("ERROR", null);
    }
}

const createClasses = async (classes) => {
    try {
        const createdClasses = await Classes.create(classes);
        return result_controller("OK", createdClasses);
    } catch (err) {
        console.log(err);
        return result_controller("ERROR", null);
    }
}

const updateClassesById = async (id, updatedData) => {
    try {
        const updatedClasses = await Classes.findByIdAndUpdate(
            id,
            {$set: updatedData},
            {new: true}
        ).exec();
        return result_controller("OK", updatedClasses);
    } catch (err) {
        console.log(err);
        return result_controller("ERROR", null);
    }
}

const deleteClassesById = async (id) => {
    try {
        const deletedClasses = await Classes.findByIdAndDelete(id).exec();
        return result_controller("OK", deletedClasses);
    } catch (err) {
        console.log(err);
        return result_controller("ERROR", null);
    }
}

// CLASS ENROLLMENT

const getAllClassMember = async (classId) => {
    try {
        const listClassMember = await (await Classes.findById(classId).populate({path: "member", model: "Students"}))
        return result_controller("OK", listClassMember)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const getClassMemberById = async (classId, studentId) => {
    try {
        const classMember = await Classes.findById(classId)
            .populate({path: "member",
            model: "Students",
            match: {_id: studentId}
            })
        return result_controller("OK", classMember.member)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const addClassMember = async (classId, studentId) => {
    try {
        const studentObjectId = Mongoose.Types.ObjectId(studentId)
        
        const addedMemeber = await Classes.findByIdAndUpdate(classId, 
            {$push : {member : studentObjectId} }, {new: true})
        
        return result_controller("OK", addedMemeber)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
} // end func

const deleteClassMember = async (classId, studentId) => {
    try {
        const studentObjectId = Mongoose.Types.ObjectId(studentId)
        
        const deletedMemeber = await Classes.findByIdAndUpdate(classId, 
            {$pull : {member : studentObjectId} }, {new: true})
        
        return result_controller("OK", deletedMemeber)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const addLessonToClass = async (classId, lessonId) => {
    try {
        const LessonObjectId = Mongoose.Types.ObjectId(lessonId);

        const classLessons = await Classes.findByIdAndUpdate(
            classId,
            {$push: {lessons : LessonObjectId}},
            {new: true}
        );

        return result_controller("OK", classLessons);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const getAllLessons = async (classId) => {
    try {
        const listOfLessons = await (
            Classes.findById(classId)
                .populate({path: "lessons", model: "Lessons"})
        );
        return result_controller("OK", listOfLessons)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const getClassLessonById = async (classId, lessonId) => {
    try {
        const classLessons = await Classes
            .findById(classId)
            .populate({
                path: "lessons",
                model: "Lessons",
                match: {_id: lessonId}
            });
        return result_controller("OK", classLessons.lessons)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const deleteClassLesson = async (classId, lessonId) => {
    try {
        const lessonObjectId = Mongoose.Types.ObjectId(lessonId)
        
        const deletedMemeber = await Classes.findByIdAndUpdate(
            classId, 
            {$pull : {lessons : lessonObjectId} }, 
            {new: true}
        );
        
        return result_controller("OK", deletedMemeber)
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

module.exports = {
    getAllClasses,
    getClassesById,
    createClasses,
    updateClassesById,
    deleteClassesById,
    getAllClassMember,
    getClassMemberById,
    addClassMember,
    deleteClassMember,
    addLessonToClass,
    getAllLessons,
    getClassLessonById,
    deleteClassLesson
}
const Lessons = require('../models/lessons');
const {result_controller} = require('../middleware');

const getAllLessons = async () => {
    try {
        const lessons = await Lessons.find({}).exec();
        return result_controller("OK", lessons);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const getLessonById = async (id) => {
    try {
        const lesson = await Lessons.findById(id).exec();
        return result_controller("OK", lesson);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const createLesson = async (lesson) => {
    try {
        const createdLesson = await Lessons.create(lesson);
        return result_controller("OK", createdLesson);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const updateLessonById = async (id, updatedData) => {
    try {
        const updatedLesson = await Lessons.findByIdAndUpdate(
            id, 
            {$set: updatedData},
            {new: true}
        ).exec();
        return result_controller("OK", updatedLesson);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const deleteLessonById = async (id) => {
    try {
        const deletedLesson = await Lessons.findByIdAndDelete(id).exec();
        return result_controller("OK", deletedLesson);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

module.exports = {
    getAllLessons,
    getLessonById,
    createLesson,
    updateLessonById,
    deleteLessonById
}
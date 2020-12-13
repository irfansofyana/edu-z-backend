const Classes = require('../models/classes');
const {result_controller} = require('../middleware');
//Class: id, name, description, owner, [lessons], [member], [feedbacks]
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
        result_controller("ERROR", null);
    }
}

const createClasses = async (classes) => {
    try {
        const createdClasses = await Classes.create(classes);
        return result_controller("OK", createdClasses);
    } catch (err) {
        console.log(err);
        result_controller("ERROR", null);
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
        result_controller("ERROR", null);
    }
}

const deleteClassesById = async (id) => {
    try {
        const deletedClasses = await Classes.findByIdAndDelete(id).exec();
        return result_controller("OK", deletedClasses);
    } catch (err) {
        console.log(err);
        result_controller("ERROR", null);
    }
}

module.exports = {
    getAllClasses,
    getClassesById,
    createClasses,
    updateClassesById,
    deleteClassesById
}
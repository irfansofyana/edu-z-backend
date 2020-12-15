const Feedbacks = require('../models/feedbacks');
const {result_controller} = require('../middleware');
const feedbacks = require('../models/feedbacks');
const Lessons = require('../models/lessons');

const getAllFeedbacks = async () => {
    try {
        const feedbacks = await Feedbacks.find({}).exec();
        return result_controller("OK", feedbacks);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const getFeedbackById = async (id) => {
    try {
        const feedback = await Feedbacks.findById(id).exec();
        return result_controller("OK", feedback);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const createFeedback = async (feedback) => {
    try {
        const createdFeedback = await Feedbacks.create(feedback);
        return result_controller("OK", createdFeedback);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const updateFeedbackById = async (id, feedback) => {
    try {
        const updatedFeedback = await Feedbacks.findByIdAndUpdate(
            id,
            {$set: feedback},
            {new: true}
        ).exec();
        return result_controller("OK", updatedFeedback);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const deleteFeedbackById = async (id) => {
    try {
        const deletedFeedback = await Feedbacks.findByIdAndDelete(id).exec();
        return result_controller("OK", deletedFeedback);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

module.exports = {
    getAllFeedbacks,
    getFeedbackById,
    createFeedback,
    updateFeedbackById,
    deleteFeedbackById
}
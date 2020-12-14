const express = require('express');
const router = express.Router();

const {
    getAllFeedbacks,
    getFeedbackById,
    createFeedback,
    updateFeedbackById,
    deleteFeedbackById
} = require('../controllers/feedbacks');
const {response_generator} = require('../middleware');

router.get('/', async (req, res) => {
    const message = await getAllFeedbacks();
    const statusCode = message.status == "OK" ? 200 : 500;
    return response_generator(statusCode, message, res);
});

router.post('/', async (req, res) => {
    const feedback = req.body;
    const message = await createFeedback(feedback);
    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

router.get('/:feedback_id', async (req, res) => {
    const feedbackId = req.params.feedback_id;
    const message = await getFeedbackById(feedbackId);
    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

router.put('/:feedback_id', async (req, res) => {
    const feedback = req.body;
    const feedbackId = req.params.feedback_id;

    const message = await updateFeedbackById(feedbackId, feedback);
    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

router.delete('/:feedback_id', async (req, res) => {
    const feedbackId = req.params.feedback_id;
    const message = await deleteFeedbackById(feedbackId);

    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

module.exports = router;
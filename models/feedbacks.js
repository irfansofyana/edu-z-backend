const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    },
    comment: {
        type: String,
    },  
    givenBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Students'
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classes'
    }
}, {
    timestamps: true
});

const feedbacks = mongoose.model('Feedbacks', feedbackSchema);

module.exports = feedbacks;
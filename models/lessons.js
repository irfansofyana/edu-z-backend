const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    lessonType: {
        type: String,
        enum: ['Material', 'Practice'],
        default: 'Material'
    }
}, {
    timestamps: true
});

const Lessons = mongoose.model('Lessons', lessonSchema);

module.exports = Lessons;
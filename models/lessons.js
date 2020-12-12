const mongoose = require('mongoose');
const Schema = mongoose.Mongoose.Schema;

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
    }
}, {
    timestamps: true
});

const Lessons = mongoose.model('Lessons', lessonSchema);

module.exports = Lessons;
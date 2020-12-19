const mongoose = require('mongoose');
const { schema } = require('./lessons');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: {
        type: String,
        required: true,
        unique: true
    },
    filepath: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Teachers'
    },
    lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lessons'
    }
}, {
    timestamps: true
})

const Files = mongoose.model('Files', fileSchema);

module.exports = Files;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    id: {
        type: String,
        require :true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        bcrypt: true,
    },
    registeredClass: {
        type: String,
        enum: ['Material', 'Practice'],
        default: 'Material'
    },
    education : {
        type: String,
    }
}, {
    timestamps: true
});

const Students = mongoose.model('Students', studentSchema);

module.exports = Students;
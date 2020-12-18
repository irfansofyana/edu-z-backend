const Classes = require('./classes')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    phone: {
        type: String,
        required: true
    },
    registeredClass: [{
        type: Schema.Types.ObjectId,
        ref: 'Classes'
    }]
}, {
    timestamps: true
});

const Students = mongoose.model('Students', studentSchema);

module.exports = Students;
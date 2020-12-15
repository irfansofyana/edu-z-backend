const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false)

const teacherSchema = new Schema({
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
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    phone: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Teachers = mongoose.model('Teachers', teacherSchema)
module.exports = Teachers
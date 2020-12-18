const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false)

const teacherSchema = new Schema({
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
    ownedClass: [{
        type: Schema.Types.ObjectId,
        ref: 'Classes'
    }]
}, {
    timestamps: true
})

const Teachers = mongoose.model('Teachers', teacherSchema)
module.exports = Teachers
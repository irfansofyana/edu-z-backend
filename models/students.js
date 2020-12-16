const Classes = require('./classes')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
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
        required: true
    },
    education : {
        type: String,
    },
    registeredClass: [{
        type: Schema.Types.ObjectId,
        ref: 'Classes'
    }]
    // TODO: Tambah atribut registeredClass = [Classes]
}, {
    timestamps: true
});

const Students = mongoose.model('Students', studentSchema);

module.exports = Students;
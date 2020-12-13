//Class: id, name, description, owner, [lessons], [member], [feedbacks]
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    owner: {
        type: String,
        required: true
    }
    // lessons: {
    //     type: String,
    //     required: true
    // },
    // member: {
    //     type: String,
    //     required: true
    // },
    // feedbacks: {
    //     type: String,
    //     required: true
    // }
    // ,
    // token_password: {
    //     type: String,
    //     required: true
    // }
}, {
    timestamps: true
});

const Classes = mongoose.model('Classes', classesSchema);

module.exports = Classes;
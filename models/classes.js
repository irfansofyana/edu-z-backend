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
        type: Schema.Types.ObjectId,
        ref: 'Teachers'
    },
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'Lessons'
    }],
    member: [{
        type: Schema.Types.ObjectId,
        ref: 'Students'
    }]
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
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
    },
    lessons: [{
        lesson_number : {type: Number},
        lesson_title : {type: String},
        lesson_body : {type: String}
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
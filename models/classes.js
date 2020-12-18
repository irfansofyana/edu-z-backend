//Class: id, name, description, owner, [lessons], [member], [feedbacks]
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Discussions = require('./discussions')

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
    discussions: [{
        type: Schema.Types.ObjectId,
        ref: "Discussions"
    }]
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
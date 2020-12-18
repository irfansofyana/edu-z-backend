//Class: id, name, description, owner, [lessons], [member], [feedbacks]
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Discussions = require('./discussions')

const classesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Teachers',
        required: true
    },
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'Lessons'
    }],
    member: [{
        type: Schema.Types.ObjectId,
        ref: 'Students'
    }],
    discussions: [{
        type: Schema.Types.ObjectId,
        ref: "Discussions"
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
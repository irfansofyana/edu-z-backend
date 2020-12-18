const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secretCodeSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ["Teacher", "Student"],
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        expires: 600
    }
});

const SecretCode = mongoose.model('SecretCode', secretCodeSchema);

module.exports = SecretCode;
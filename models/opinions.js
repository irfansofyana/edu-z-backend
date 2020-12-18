const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opinionSchema = new Schema({
    opinion: {
        type: String
    },
    opinionBy: {
        type: Schema.Types.ObjectId,
        ref: "Students"
    }
},{
    timestamps: true
})

const Opinions = mongoose.model('Opinions', opinionSchema)
module.exports = Opinions
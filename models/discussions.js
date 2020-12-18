const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discussionSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    content:{
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Teachers"
    },
    opinions: [{
        type: Schema.Types.ObjectId,
        ref: "Opinions"
    }]
})




const Discussions = mongoose.model('Discussions', discussionSchema)
module.exports = Discussions
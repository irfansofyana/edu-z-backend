const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileuploadsSchema = new Schema({
    // teacher: {
    //     type: String
    // },
    // lesson: {
    //     type: String
    // },
    filePath: {
        type: String
    },
    givenBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Students'
    }
},{
    timestamps: true
});

const Fileuploads = mongoose.model('Fileuploads', fileuploadsSchema);

module.exports = Fileuploads;
const Fileupload = require('../models/fileuploads');
const {result_controller} = require ('../middleware');
// const multer = require('multer');
// const uuid = require('uuid').v4;
// const path = require('path');
// const Image = require('../models/fileuploads');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         const id =  uuid();
//         const filePath = `files/${id}${ext}`;
//         Image.create({ filePath })
//         .then (() => {
//             cb(null, filePath);
//         });
//     }
// });

// const upload = multer ({ storage });

const getAllFile = async () => {
    try {
        const file = await Fileupload.find({}).exec();
        return result_controller("OK", file);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const getFileById = async (id) => {
    try {
        const file = await Fileupload.findById(id).exec();
        return result_controller("OK", file);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const uploadFile = async (fileupload) => {
    try {
        //upload.single('files');
        const uploadedFile = await Fileupload.create(fileupload);
        return result_controller("OK", uploadedFile);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const updateFilenameById = async (id, file) => {
    try {
        const updatedFilename = await Fileupload.findByIdAndUpdate(
            id,
            {$set: feedback},
            {new: true}
        ).exec();
        return result_controller("OK", updatedFilename);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const deleteFileById = async (id) => {
    try {
        const deletedFile = await Fileupload.findByIdAndDelete(id).exec();
        return result_controller("OK", deletedFile);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

module.exports = {
    getAllFile,
    getFileById,
    uploadFile,
    updateFilenameById,
    deleteFileById
}
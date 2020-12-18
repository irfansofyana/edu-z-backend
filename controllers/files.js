const { path } = require('../app');
const {result_controller} = require('../middleware');
const Files = require('../models/files');
const {filesHelper} = require('../helper');

const addFile = async (data) => {
    try {
        const createdFile = await Files.create(data);
        return result_controller("OK", createdFile);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const getAllFiles = async () => {
    try {
        const files = await Files.find({}).exec();
        return result_controller("OK", files);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}


const getFileById = async (fileId) => {
    try {
        const file = await Files.findById(fileId).exec();
        return result_controller("OK", file);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const getFileByFilename = async (filename) => {
    try {
        const file = await Files.findOne({filename: filename}).exec();
        return result_controller("OK", file);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const deleteFileById = async (fileId) => {
    try {
        const deletedFile = await Files.findByIdAndDelete(fileId).exec();
        filesHelper.deleteFile(deletedFile.filepath);

        return result_controller("OK", deletedFile);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const deleteFileByFilename = async (filename) => {
    try {
        const deletedFile = await Files.findOneAndDelete(
            {filename: filename}
        ).exec();
        filesHelper.deleteFile(deletedFile.filepath);
        
        return result_controller("OK", deletedFile);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

module.exports = {
    addFile,
    getAllFiles,
    getFileById,
    getFileByFilename,
    deleteFileById,
    deleteFileByFilename
}
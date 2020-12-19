const fs = require('fs');

const deleteFile = (filepath) => {
    try {
        fs.unlinkSync(filepath);
    } catch (err) {
        console.error(err);
    } 
}

const isExistFile = (filepath) => {
    try {
        return fs.existsSync(filepath);
    } catch (err) {
        console.error(err);
    }
}

const renameFile = (oldpath, newpath) => {
    try {
        fs.renameSync(oldpath, newpath);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    deleteFile,
    isExistFile,
    renameFile
}
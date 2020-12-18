const { path } = require('../app');
const {result_controller} = require('../middleware');
const Files = require('../models/files');

const addFile = async (data) => {
    try {
        const createdFile = await Files.create(data);
        return result_controller("OK", createdFile);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

module.exports = {
    addFile
}
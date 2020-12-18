const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    addFile,
    getAllFiles,
    getFileById,
    getFileByFilename,
    deleteFileById,
    deleteFileByFilename
} = require('../controllers/files');
const { response_generator } = require('../middleware');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/lessons');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

router.post('/', upload.single('file'), async (req, res, next) => {
    try {
        const data = {
            'filename': req.file.originalname,
            'filepath': path.join(__dirname, `../uploads/lessons/${req.file.originalname}`),
            'owner': req.body.owner,
            'lesson': req.body.lesson
        }
        const message = await addFile(data);
        const statusCode = message.status == "OK" ? 200:500;

        return response_generator(statusCode, message, res);
    } catch (err) {
        console.error(err);
        return response_generator(500, null, res);
    }
});

router.get('/', async (req, res, next) => {
    const message = await getAllFiles();
    const statusCode = message.status == "OK" ? 200:500;

    return response_generator(statusCode, message, res);
});

router.get('/:file_id', async (req, res, next) => {
    const message = await getFileById(req.params.file_id);
    const statusCode = message.status == "OK" ? 200:500;

    return response_generator(statusCode, message, res);
});

router.get('/:file_id/download', async (req, res, next) => {
    const message = await getFileById(req.params.file_id);

    if (message.status === "OK") {
        const filePath = message.data.filepath;
        res.sendFile(filePath);
    } else {
        return response_generator(500, null, res);
    }
});

router.get('/name/:file_name', async (req, res, next) => {
    const message = await getFileByFilename(req.params.file_name);
    const statusCode = message.status == "OK" ? 200:500;

    return response_generator(statusCode, message, res);
});

router.delete('/:file_id', async (req, res, next) => {
    const message = await deleteFileById(req.params.file_id);
    const statusCode = message.status == "OK" ? 200:500;

    return response_generator(statusCode, message, res);
});

router.delete('/name/:file_name', async (req, res, next) => {
    const message = await deleteFileByFilename(req.params.file_name);
    const statusCode = message.status == "OK" ? 200:500;

    return response_generator(statusCode, message, res);
});

module.exports = router;
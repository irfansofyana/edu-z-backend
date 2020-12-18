const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {addFile} = require('../controllers/files');
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
    }
});

module.exports = router;
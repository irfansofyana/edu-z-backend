const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const multer = require('multer');
const uuid = require('uuid').v4;
const path = require('path');
const Fileuploads = require('../models/fileuploads');

const {
    getAllFile,
    getFileById,
    uploadFile,
    updateFilenameById,
    deleteFileById
} = require('../controllers/fileuploads');
const {response_generator} = require('../middleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const id =  uuid();
        const filePath = `files/${id}${ext}`;
        Fileuploads.create({ filePath })
        .then (() => {
            cb(null, filePath);
        });
    }
});

const upload = multer ({ storage });
// const avatar = multer({
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(pdf)$/))
//         return cb(new Error('File is not supported'))
//         cb(undefined, true)
//     }
// })

router.get('/', async (req, res) => {
    const message = await getAllFile();
    const statusCode = message.status == "OK" ? 200 : 500;
    return response_generator(statusCode, message, res);
});

router.post('/', upload.single('files'), async (req, res) => {
    const fileupload = req.body;
    //const fileupload = req.file;
    //upload.single('files');
    const message = await uploadFile(fileupload);
    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
    //return res.redirect('/');
});

router.get('/:file_id', async (req, res) => {
    const fileId = req.params.file_id;
    const message = await getFileById(fileId);
    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

router.put('/:file_id', async (req, res) => {
    const file = req.body;
    const fileId = req.params.file_id;

    const message = await updateFilenameById(fileId, file);
    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

router.delete('/:file_id', async (req, res) => {
    const fileId = req.params.file_id;
    const message = await deleteFileById(fileId);

    const statusCode = message.status == "OK" ? 200 : 500;
    
    return response_generator(statusCode, message, res);
});

module.exports = router;

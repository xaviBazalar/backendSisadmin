
const { Router } = require('express');

const {fileGet, filePost, filePatch}=require('../controllers/upload');

const router = Router();

router.get('/', fileGet );

router.post('/', filePost );

router.patch('/', filePatch );





module.exports = router;
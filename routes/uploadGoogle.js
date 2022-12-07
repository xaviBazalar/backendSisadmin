
const { Router } = require('express');

const {uploadGooglePost}=require('../controllers/uploadGoogle');

const router = Router();

router.post('/', uploadGooglePost );

module.exports = router;
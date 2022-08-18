
const { Router } = require('express');
const {loginPatch, loginPost}=require('../controllers/login');

const router = Router();

router.post('/', loginPost );
router.patch('/', loginPatch );





module.exports = router;
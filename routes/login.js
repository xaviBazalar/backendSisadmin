
const { Router } = require('express');
const {loginGet,loginPatch, loginPost}=require('../controllers/login');

const router = Router();

router.get("/",loginGet)
router.post('/', loginPost );
router.patch('/', loginPatch );





module.exports = router;
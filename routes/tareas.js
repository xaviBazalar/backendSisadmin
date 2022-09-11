
const { Router } = require('express');
const { check } = require('express-validator');



const { tareasGet,tareasPost,tareasPatch } = require('../controllers/tareas');

const router = Router();


router.get('/', tareasGet );
router.post('/',tareasPost);

router.patch('/', tareasPatch );




module.exports = router;
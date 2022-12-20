
const { Router } = require('express');
const { check } = require('express-validator');



const { tareasGet,tareasPost,tareasPatch, tareasPut, tareasDel } = require('../controllers/tareas');

const router = Router();


router.get('/', tareasGet );
router.post('/',tareasPost);
router.put('/',tareasPut);
router.patch('/', tareasPatch );
router.delete('/', tareasDel );



module.exports = router;

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {contratosGet, contratosPatch, contratosPost}=require('../controllers/contratos');

const router = Router();


router.get('/', contratosGet );
router.post('/',contratosPost);

router.patch('/', contratosPatch );




module.exports = router;
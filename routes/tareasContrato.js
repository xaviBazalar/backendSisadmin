
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {tareasContratoGet,tareasContratoPatch, tareasContratoPost}=require('../controllers/tareasContrato');

const router = Router();


router.get('/', tareasContratoGet );
router.post('/',tareasContratoPost);
router.patch('/', tareasContratoPatch );




module.exports = router;
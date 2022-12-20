
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {tareasContratoGet,tareasContratoPatch, tareasContratoPost, tareasContratoPut, tareasContratoDel}=require('../controllers/tareasContrato');

const router = Router();


router.get('/', tareasContratoGet );
router.post('/',tareasContratoPost);
router.put('/',tareasContratoPut);
router.patch('/', tareasContratoPatch );
router.delete('/', tareasContratoDel)



module.exports = router;
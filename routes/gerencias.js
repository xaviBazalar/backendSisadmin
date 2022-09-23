const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const {  gerenciaGet,gerenciaPatch, gerenciaPost, gerenciaPut} = require('../controllers/gerencias');

const router = Router();


router.get('/', gerenciaGet );
router.post('/', gerenciaPost )
router.put('/', gerenciaPut)
router.patch('/', gerenciaPatch );




module.exports = router;

const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const {solicitudesGet, solicitudesPost, solicitudesPatch, solicitudesPut}=require('../controllers/solicitudes');

const router = Router();

router.get('/', solicitudesGet );

router.post('/', solicitudesPost );

router.patch('/', solicitudesPatch );

router.put('/:id',solicitudesPut );





module.exports = router;
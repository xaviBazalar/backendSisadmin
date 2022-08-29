
const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const {historialResultadoSolicitudGet, historialResultadoSolicitudPost, historialResultadoSolicitudPatch, historialResultadoSolicitudPut}=require('../controllers/historialResultadoSolicitud');

const router = Router();

router.get('/', historialResultadoSolicitudGet );

router.put('/:id',historialResultadoSolicitudPut );

router.post('/', historialResultadoSolicitudPost );

router.patch('/', historialResultadoSolicitudPatch );





module.exports = router;
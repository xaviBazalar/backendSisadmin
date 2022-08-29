
const { Router } = require('express');

const {notificacionUsuarioGet, notificacionUsuarioPut, notificacionUsuarioPost, notificacionUsuarioPatch}=require('../controllers/notificacionesUsuario');

const router = Router();

router.get('/', notificacionUsuarioGet );

router.put('/:id',notificacionUsuarioPut );

router.post('/', notificacionUsuarioPost );

router.patch('/', notificacionUsuarioPatch );


module.exports = router;
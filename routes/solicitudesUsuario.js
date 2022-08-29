
const { Router } = require('express');

const {solicitudesUsuarioGet, solicitudesUsuarioPatch}=require('../controllers/solicitudesUsuario');

const router = Router();

router.get('/', solicitudesUsuarioGet );

router.patch('/', solicitudesUsuarioPatch );


module.exports = router;

const { Router } = require('express');

const {recoverUsuarioGet, recoverUsuarioUpdate}=require('../controllers/recoveryUsuario');

const router = Router();

router.get('/', recoverUsuarioGet );

router.put('/:id',recoverUsuarioUpdate );


module.exports = router;
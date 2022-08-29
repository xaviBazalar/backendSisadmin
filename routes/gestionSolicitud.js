
const { Router } = require('express');

const {gestionSolicitudGet, gestionSolicitudPut, gestionSolicitudPost, gestionSolicitudPatch}=require('../controllers/gestionSolicitud');

const router = Router();

router.get('/',gestionSolicitudGet );

router.put('/:id',gestionSolicitudPut );

router.post('/', gestionSolicitudPost );

router.patch('/', gestionSolicitudPatch );


module.exports = router;
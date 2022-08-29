
const { Router } = require('express');

const {tareaDocumentosSalidaSolicitudPatch,tareaDocumentosSalidaSolicitudPut, tareaDocumentosSalidaSolicitudPost, tareaDocumentosSalidaSolicitudGet}=require('../controllers/tareaDocumentosSalidaSolicitud');

const router = Router();

router.get('/', tareaDocumentosSalidaSolicitudGet );

router.post('/', tareaDocumentosSalidaSolicitudPost );

router.patch('/', tareaDocumentosSalidaSolicitudPatch );

router.put('/:id',tareaDocumentosSalidaSolicitudPut );


module.exports = router;
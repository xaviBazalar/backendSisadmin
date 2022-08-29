
const { Router } = require('express');

const {tareaDocumentosEntradaSolicitudGet, tareaDocumentosEntradaSolicitudPost, tareaDocumentosEntradaSolicitudPatch,tareaDocumentosEntradaSolicitudPut}=require('../controllers/tareaDocumentosEntradaSolicitud');

const router = Router();

router.get('/', tareaDocumentosEntradaSolicitudGet );

router.post('/', tareaDocumentosEntradaSolicitudPost );

router.patch('/', tareaDocumentosEntradaSolicitudPatch );

router.put('/:id',tareaDocumentosEntradaSolicitudPut );


module.exports = router;
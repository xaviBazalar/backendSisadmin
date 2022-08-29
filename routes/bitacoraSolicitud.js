
const { Router } = require('express');

const {bitacoraSolicitudGet, bitacoraSolicitudPut, bitacoraSolicitudPost, bitacoraSolicitudPatch}=require('../controllers/bitacoraSolicitud');

const router = Router();

router.get('/', bitacoraSolicitudGet );

router.put('/:id',bitacoraSolicitudPut );

router.post('/', bitacoraSolicitudPost );

router.patch('/', bitacoraSolicitudPatch );


module.exports = router;
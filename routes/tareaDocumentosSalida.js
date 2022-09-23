
const { Router } = require('express');

const {tareaDocumentosSalidaPost, tareaDocumentosSalidaPatch, tareaDocumentosSalidaPut, tareaDocumentosSalidaGet}=require('../controllers/tareaDocumentosSalida');

const router = Router();

router.get('/', tareaDocumentosSalidaGet );

router.post('/', tareaDocumentosSalidaPost );

router.patch('/', tareaDocumentosSalidaPatch );

router.put('/',tareaDocumentosSalidaPut );


module.exports = router;
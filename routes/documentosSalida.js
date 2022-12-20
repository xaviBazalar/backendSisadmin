
const { Router } = require('express');

const {documentosSalidaGet, documentosSalidaPatch, documentosSalidaPost, documentosSalidaPut,documentosSalidaDel}=require('../controllers/documentosSalida');

const router = Router();

router.get('/', documentosSalidaGet );

router.post('/', documentosSalidaPost );

router.put('/', documentosSalidaPut );

router.patch('/', documentosSalidaPatch );

router.delete('/', documentosSalidaDel );




module.exports = router;
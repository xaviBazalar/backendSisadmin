
const { Router } = require('express');

const {documentosSalidaGet, documentosSalidaPatch, documentosSalidaPost, documentosSalidaPut}=require('../controllers/documentosSalida');

const router = Router();

router.get('/', documentosSalidaGet );

router.post('/', documentosSalidaPost );

router.put('/', documentosSalidaPut );

router.patch('/', documentosSalidaPatch );





module.exports = router;
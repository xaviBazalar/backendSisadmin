
const { Router } = require('express');

const {documentosSalidaGet, documentosSalidaPatch, documentosSalidaPost}=require('../controllers/documentosSalida');

const router = Router();

router.get('/', documentosSalidaGet );

router.post('/', documentosSalidaPost );

router.patch('/', documentosSalidaPatch );





module.exports = router;
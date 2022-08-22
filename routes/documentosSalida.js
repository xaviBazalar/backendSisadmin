
const { Router } = require('express');

const {documentosSalidaGet, documentosSalidaPatch}=require('../controllers/documentosSalida');

const router = Router();

router.get('/', documentosSalidaGet );

router.patch('/', documentosSalidaPatch );





module.exports = router;
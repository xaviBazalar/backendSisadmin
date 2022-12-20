
const { Router } = require('express');

const {documentosEntradaGet, documentosEntradaPatch, documentosEntradaPost, documentosEntradaPut,documentosEntradaDel}=require('../controllers/documentosEntrada');

const router = Router();

router.get('/', documentosEntradaGet );
router.post('/', documentosEntradaPost );
router.put('/', documentosEntradaPut);
router.patch('/', documentosEntradaPatch );
router.delete('/', documentosEntradaDel );




module.exports = router;
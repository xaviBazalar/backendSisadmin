
const { Router } = require('express');

const {documentosEntradaGet, documentosEntradaPatch, documentosEntradaPost, documentosEntradaPut}=require('../controllers/documentosEntrada');

const router = Router();

router.get('/', documentosEntradaGet );
router.post('/', documentosEntradaPost );
router.put('/', documentosEntradaPut);
router.patch('/', documentosEntradaPatch );





module.exports = router;
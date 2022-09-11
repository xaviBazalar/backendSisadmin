
const { Router } = require('express');

const {documentosEntradaGet, documentosEntradaPatch, documentosEntradaPost}=require('../controllers/documentosEntrada');

const router = Router();

router.get('/', documentosEntradaGet );
router.post('/', documentosEntradaPost );

router.patch('/', documentosEntradaPatch );





module.exports = router;

const { Router } = require('express');

const {documentosEntradaGet, documentosEntradaPatch}=require('../controllers/documentosEntrada');

const router = Router();

router.get('/', documentosEntradaGet );

router.patch('/', documentosEntradaPatch );





module.exports = router;
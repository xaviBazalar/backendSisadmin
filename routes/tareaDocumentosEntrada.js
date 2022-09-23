
const { Router } = require('express');

const {tareaDocumentosEntradaGet, tareaDocumentosEntradaPatch, tareaDocumentosEntradaPost,tareaDocumentosEntradaPut}=require('../controllers/tareaDocumentosEntrada');

const router = Router();

router.get('/', tareaDocumentosEntradaGet );

router.post('/', tareaDocumentosEntradaPost );

router.patch('/', tareaDocumentosEntradaPatch );

router.put('/',tareaDocumentosEntradaPut );


module.exports = router;
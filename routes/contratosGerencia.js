
const { Router } = require('express');

const {contratosGerenciaGet,contratosGerenciaPut, contratosGerenciaPost, contratosGerenciaPatch, contratosGerenciaDel}=require('../controllers/contratosGerencia');

const router = Router();

router.get('/', contratosGerenciaGet );

router.put('/',contratosGerenciaPut );

router.post('/', contratosGerenciaPost );

router.patch('/', contratosGerenciaPatch );

router.delete('/', contratosGerenciaDel );


module.exports = router;
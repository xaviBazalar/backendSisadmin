
const { Router } = require('express');

const {contratosGerenciaGet,contratosGerenciaPut, contratosGerenciaPost, contratosGerenciaPatch}=require('../controllers/contratosGerencia');

const router = Router();

router.get('/', contratosGerenciaGet );

router.put('/:id',contratosGerenciaPut );

router.post('/', contratosGerenciaPost );

router.patch('/', contratosGerenciaPatch );


module.exports = router;
const { Router } = require('express');

const {  gerenciaGet,gerenciaPatch, gerenciaPost, gerenciaPut,gerenciaDel} = require('../controllers/gerencias');

const router = Router();


router.get('/', gerenciaGet );
router.post('/', gerenciaPost )
router.put('/', gerenciaPut)
router.patch('/', gerenciaPatch );
router.delete('/', gerenciaDel);



module.exports = router;
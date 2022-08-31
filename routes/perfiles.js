
const { Router } = require('express');

const {perfilesGet, perfilesPut, perfilesPost, perfilesPatch}=require('../controllers/perfiles');

const router = Router();

router.get('/', perfilesGet );

router.put('/:id',perfilesPut );

router.post('/', perfilesPost );

router.patch('/', perfilesPatch );


module.exports = router;
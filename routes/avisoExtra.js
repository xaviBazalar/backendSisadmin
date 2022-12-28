
const { Router } = require('express');
const {avisoExtraPut, avisoExtraGet, avisoExtraPost,avisoExtraDel}=require('../controllers/avisoExtra');

const router = Router();

router.put('/', avisoExtraPut );
router.post('/', avisoExtraPost)
router.get('/', avisoExtraGet)
router.delete('/',avisoExtraDel)

module.exports = router;
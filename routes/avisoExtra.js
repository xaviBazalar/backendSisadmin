
const { Router } = require('express');
const {avisoExtraPut, avisoExtraGet, avisoExtraPost}=require('../controllers/avisoExtra');

const router = Router();

router.put('/', avisoExtraPut );
router.post('/', avisoExtraPost)
router.get('/', avisoExtraGet)

module.exports = router;
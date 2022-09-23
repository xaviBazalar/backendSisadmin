
const { Router } = require('express');
const {documentacionSolicitudGet,documentacionSolicitudPost, documentacionSolicitudPatch, documentacionSolicitudPut}=require('../controllers/documentacionSolicitudes');

const router = Router();

router.get('/', documentacionSolicitudGet );
router.post('/',documentacionSolicitudPost);
router.put('/',documentacionSolicitudPut);
router.patch('/', documentacionSolicitudPatch );





module.exports = router;
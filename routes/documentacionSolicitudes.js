
const { Router } = require('express');
const {documentacionSolicitudGet,documentacionSolicitudPost, documentacionSolicitudPatch}=require('../controllers/documentacionSolicitudes');

const router = Router();

router.get('/', documentacionSolicitudGet );
router.post('/',documentacionSolicitudPost);

router.patch('/', documentacionSolicitudPatch );





module.exports = router;

const { Router } = require('express');
const {documentacionSolicitudGet, documentacionSolicitudPatch}=require('../controllers/documentacionSolicitudes');

const router = Router();

router.get('/', documentacionSolicitudGet );

router.patch('/', documentacionSolicitudPatch );





module.exports = router;
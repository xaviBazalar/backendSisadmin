
const { Router } = require('express');
const {documentacionSolicitudGet,documentacionSolicitudPost, documentacionSolicitudPatch, documentacionSolicitudPut, documentacionSolicitudDel}=require('../controllers/documentacionSolicitudes');

const router = Router();

router.get('/', documentacionSolicitudGet );
router.post('/',documentacionSolicitudPost);
router.put('/',documentacionSolicitudPut);
router.patch('/', documentacionSolicitudPatch );
router.delete('/', documentacionSolicitudDel );





module.exports = router;

const { Router } = require('express');
const {autorizacionSolicitudPut,autorizacionSolicitudGet}=require('../controllers/autorizacionSolicitud');

const router = Router();

router.put('/', autorizacionSolicitudPut );
router.get('/', autorizacionSolicitudGet)

module.exports = router;
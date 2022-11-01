const { Router } = require('express');
const {reporteGet, reportePost}=require('../controllers/reporteExcel');

const router = Router();

router.get("/",reporteGet)
router.post("/",reportePost)


module.exports = router;
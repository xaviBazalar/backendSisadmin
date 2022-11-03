
const { Router } = require('express');

const {dashboardGet}=require('../controllers/dashboard');

const router = Router();

router.get('/', dashboardGet );

module.exports = router;
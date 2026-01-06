const express = require('express')
const router = new express.Router()
const pageDashboardController = require('../controllers/dashboard-controller');


router.get('/dashboard', pageDashboardController.dashboard);
router.get('/dashboard/:dept', pageDashboardController.departmentDashboard)


module.exports = router
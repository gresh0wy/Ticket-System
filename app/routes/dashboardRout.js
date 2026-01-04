const express = require('express')
const router = new express.Router()
const pageDashboardController = require('../controllers/dashboard-controller');


router.get('/dashboard', pageDashboardController.dashboard);

router.get('/dashboard/it', pageDashboardController.departmentIT);

router.get('/dashboard/elektryczny', pageDashboardController.departmentElec);

router.get('/dashboard/aparatura-medyczna', pageDashboardController.departmentMe);

router.get('/dashboard/budowlany', pageDashboardController.departmentConst);

router.get('/dashboard/cyberbezpieczenstwo', pageDashboardController.departmentcybe);


module.exports = router
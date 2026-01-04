const express = require('express')
const router = new express.Router()
const pageController = require('../controllers/page-controller')

router.use(pageController.notFound)
router.use(pageController.forbidden)

module.exports = router
const express = require('express')
const router = new express.Router()
const pageController = require('../controllers/page-controller')

router.get('/', pageController.home)
router.get('/login', pageController.loginPage)
router.get('/test', pageController.experimental)
router.get("/zgłoszenie/:id", pageController.tickets)


module.exports = router
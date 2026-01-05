const express = require('express')
const router = new express.Router()
const pageController = require('../controllers/page-controller')





router.get('/', pageController.home)
router.get('/login', pageController.loginPage)
router.get('/test', pageController.experimental)
router.get('/zgloszenie/:id', pageController.ticketDetails);
router.post('/zgloszenie/:id/status', pageController.updateTicketStatus);
router.post('/zgloszenie/:id/priorytet', pageController.updateTicketPriority);




module.exports = router
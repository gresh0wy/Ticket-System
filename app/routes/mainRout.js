const express = require('express')
const router = new express.Router()
const pageController = require('../controllers/page-controller')





router.get('/', pageController.home)
router.get('/login', pageController.loginPage)
router.get('/test', pageController.experimental)
router.get('/ticket/:id', pageController.ticketDetails);
router.post('/ticket/:id/status', pageController.updateTicketStatus);
router.post('/ticket/:id/priorytet', pageController.updateTicketPriority);




module.exports = router
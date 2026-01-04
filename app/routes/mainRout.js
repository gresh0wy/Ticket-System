const express = require('express')
const router = new express.Router()
const pageController = require('../controllers/page-controller')

// Middleware do parsowania formularzy
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



router.get('/', pageController.home)
router.get('/login', pageController.loginPage)
router.get('/test', pageController.experimental)
router.get('/zgloszenie/:id', pageController.ticketDetails);



// POST do wysyłania zgłoszenia
app.post('/sendTickets', pageController.sendTicket);



module.exports = router
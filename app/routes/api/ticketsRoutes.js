const express = require('express')
const router = new express.Router()
const ticketControllers = require('../../controllers/ticket-controllers')


router.post('/tickets', ticketControllers.createTickets);

router.get('/tickets', ticketControllers.showAllTickets)

router.get('/tickets/:id', ticketControllers.showTickets)

router.delete('/tickets/:id', ticketControllers.deleteTickets)

router.patch('/tickets/:id', ticketControllers.editTickets)

module.exports = router
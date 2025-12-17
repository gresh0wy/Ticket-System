const express = require('express')
const router = new express.Router()


router.get('/', (req, res) => {
    res.render('pages/formTicket',
        {
            title: 'Zgłoś problem'
        }
    )
})

router.get('/login', (req, res) => {
    res.render('pages/loginPage',
        {
            title: 'Strona logowania'
        }
    )
})

router.get('/test', (req, res) => {
    res.render('pages/thankYou',
        {
            title: 'Dziękujemy za zgłoszenie',
            ticketId: 1
        }
    )
})
module.exports = router
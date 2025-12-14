const express = require('express')
const router = new express.Router()


router.get('/', (req, res) => {
    res.render('pages/formTicket',
        {
            tittle: 'Zgłoś problem'
        }
    )
})

router.get('/login', (req, res) => {
    res.render('pages/loginPage',
        {
            tittle: 'Strona logowania'
        }
    )
})

router.get('/test', (req, res) => {
    res.render('pages/thankYou',
        {
            tittle: 'Dziękujemy za zgłoszenie',
            ticketId: 1
        }
    )
})
module.exports = router
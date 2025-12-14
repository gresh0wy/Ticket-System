const express = require('express')
const router = new express.Router()

router.use((req, res) => {
    res.status(404).render('errors/404',
        {
            tittle: 'strona nie odnaleziona',
            layout: 'layouts/errorLayouts'
        }
    )
})

router.use((req, res) => {
    res.status(403).render('errors/403',
        {
            tittle: 'Brak dostępu',
            layout: 'layouts/errorLayouts'
        }
    )
})

module.exports = router
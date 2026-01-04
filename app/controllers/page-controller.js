class pageController{


home(req, res)  {
    res.render('pages/formTicket',
        {
            title: 'Zgłoś problem'
        }
    )
}
loginPage(req, res){
    res.render('pages/loginPage',
        {
            title: 'Strona logowania'
        }
    )
}
experimental(req, res)  {
    res.render('pages/thankYou',
        {
            title: 'Dziękujemy za zgłoszenie',
            ticketId: 1
        }
    )
}
tickets (req, res){
    res.render()
}


// OBSŁUGA BŁEDÓW 404 I 403
    notFound(req, res) {
    res.status(404).render('errors/404',
        {
            title: 'strona nie odnaleziona',
            layout: 'layouts/errorLayouts'
        }
    )
}

forbidden(req, res) {
    res.status(403).render('errors/403',
        {
            title: 'Brak dostępu',
            layout: 'layouts/errorLayouts'
        }
    )
}

}

module.exports = new pageController();
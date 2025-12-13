const express = require('express')
const app = express()
const path = require('path')
const expressLayouts = require('express-ejs-layouts');
const port = 3000

app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'ejs')
app.use(expressLayouts);
app.set('layout', 'layouts/default');





app.get('/', (req, res) => {
    res.render('pages/formTicket',
        {
            tittle: 'Zgłoś problem'
        }
    )
})

app.get('/login', (req, res) => {
    res.render('pages/loginPage',
        {
            tittle: 'Strona logowania'
        }
    )
})

app.use((req, res) => {
    res.status(404).render('errors/404',
        {
            tittle: 'strona nie odnaleziona',
            layout: 'layouts/errorLayouts'
        }
    )
})

app.use((req, res) => {
    res.status(403).render('errors/403',
        {
            tittle: 'Brak dostępu',
            layout: 'layouts/errorLayouts'
        }
    )
})





app.listen(port, () => {
    console.log(`serwer słucha na porcie: ${port}`);
})

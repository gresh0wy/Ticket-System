const express = require('express')
const app = express()
const pool = require('./database/dbConfig');
const path = require('path')
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();
const port = 3000

const pageController = require('./controllers/page-controller')


// Middleware do parsowania formularzy
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'ejs')
app.use(expressLayouts);
app.set('layout', 'layouts/default');

// POST do wysyłania zgłoszenia

app.post('/sendTickets', pageController.sendTicket);


// routes

app.use(require('./routes/mainRout'))
app.use(require('./routes/dashboardRout'))
app.use(require('./routes/errorRout'))





app.listen(port, () => {
    console.log(`serwer słucha na porcie: ${port}`);
})

const express = require('express')
const app = express()
const path = require('path')
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();
const port = 3000


app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'ejs')
app.use(expressLayouts);
app.set('layout', 'layouts/default');

// Middleware do parsowania formularzy
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes

app.use(require('./routes/mainRout'))
app.use(require('./routes/dashboardRout'))


//api

app.use(require('./routes/api/ticketsRouter'))

//errory
app.use(require('./routes/errorRout'))


app.listen(port, () => {
    console.log(`serwer słucha na porcie: ${port}`);
})

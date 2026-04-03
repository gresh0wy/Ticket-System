const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config();
const port = 3000

app.use(express.static('public'))

// Middleware do parsowania formularzy
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use(require('./routes/mainRoutes'))

//api

app.use('/api', require('./routes/api/ticketsRoutes'))
app.use('/auth', require('./routes/api/authRoutes'))

//errory
app.use(require('./routes/errorRoutes'))


app.listen(port, () => {
    console.log(`serwer słucha na porcie: ${port}`);
})

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


app.listen(port, () => {
    console.log(`serwer słucha na porcie: ${port}`);
})



app.get('/', (req, res) => {
    res.render('pages/formTicket')
})
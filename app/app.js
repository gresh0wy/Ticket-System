const express = require('express')
const app = express()
const path = require('path')
const expressLayouts = require('express-ejs-layouts');
const pool = require('./database/dbConfig'); // <-- tu importujemy pool
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

// Endpoint POST do wysyłania zgłoszenia

app.post('/sendTickets', async (req, res) => {
    const {
        imie_nazwisko,
        numer_wewnetrzny,
        miejsce_zdarzenia,
        dzial_docelowy,
        kategoria_zgloszenia,
        temat_zgloszenia,
        opis_zgloszenia,
        priorytet_zgloszenia,
        powtarzalnosc
    } = req.body;

    try {
        const conn = await pool.getConnection();
        const sql = `
            INSERT INTO tickets (
                imie_nazwisko, numer_wewnetrzny, miejsce_zdarzenia,
                dzial_docelowy, kategoria_zgloszenia, temat_zgloszenia,
                opis_zgloszenia, priorytet_zgloszenia, powtarzalnosc,
                utworzone_przez
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const result = await conn.query(sql, [
            imie_nazwisko,
            numer_wewnetrzny,
            miejsce_zdarzenia,
            dzial_docelowy,
            kategoria_zgloszenia,
            temat_zgloszenia,
            opis_zgloszenia,
            priorytet_zgloszenia,
            powtarzalnosc,
            imie_nazwisko  // przypisujemy do utworzone_przez
        ]);
        conn.release();

        // result.insertId to ID nowo wstawionego zgłoszenia
        res.render('pages/thankYou', {
            title: 'Dziękujemy za zgłoszenie',
            ticketId: result.insertId
        });
    } catch (err) {
        console.error('Błąd SQL:', err);
        res.status(500).send(err);
        // `Błąd podczas zapisywania zgłoszenia. ${err}`
    }
});


















// routes

app.use(require('./routes/mainRout'))
app.use(require('./routes/dashboardRout'))
app.use(require('./routes/errorRout'))












app.listen(port, () => {
    console.log(`serwer słucha na porcie: ${port}`);
})

const pool = require('../database/dbConfig');

class pageController {


    home(req, res) {
        res.render('pages/formTicket',
            {
                title: 'Zgłoś problem'
            }
        )
    }
    loginPage(req, res) {
        res.render('pages/loginPage',
            {
                title: 'Strona logowania'
            }
        )
    }
    experimental(req, res) {
        res.render('pages/thankYou',
            {
                title: 'Dziękujemy za zgłoszenie',
                ticketId: 1
            }
        )
    }


    async ticketDetails(req, res) {
        const { id } = req.params;

        try {
            const conn = await pool.getConnection();

            const result = await conn.query(
                'SELECT * FROM tickets WHERE id = ?',
                [id]
            );

            conn.release();


            const rows = Array.isArray(result) && Array.isArray(result[0])
                ? result[0]
                : result;



            if (!rows || rows.length === 0) {
                return res.status(404).render('pages/404', {
                    title: 'Nie znaleziono zgłoszenia'
                });
            }

            res.render('pages/ticketDetails', {
                title: `Zgłoszenie #${id}`,
                ticket: rows[0]
            });

        } catch (err) {
            console.error('Błąd SQL:', err);
            res.status(500).send('Błąd pobierania zgłoszenia');
        }
    }









    // kontroler do wysyania zgłoszenia

    async sendTicket(req, res) {
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
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
                ticket: rows[0],
                layout: 'layouts/dashboardLayouts',
                navItems: ''
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
                imie_nazwisko
            ]);
            conn.release();

            res.render('pages/thankYou', {
                title: 'Dziękujemy za zgłoszenie',
                ticketId: result.insertId
            });
        } catch (err) {
            console.error('Błąd SQL:', err);
            res.status(500).send(err);

        }
    }


    async updateTicketStatus(req, res) {
        const { id } = req.params;
        const { status_zgloszenia } = req.body;

        const allowedStatuses = ['new', 'in_progress', 'closed', 'canceled'];

        // Walidacja statusu
        if (!allowedStatuses.includes(status_zgloszenia)) {
            return res.redirect(`/ticket/${id}?msg=invalid_status`);
        }

        try {
            const conn = await pool.getConnection();

            const result = await conn.query(
                `UPDATE tickets 
             SET status_zgloszenia = ? 
             WHERE id = ?`,
                [status_zgloszenia, id]
            );

            conn.release();

            if (result.affectedRows === 0) {
                return res.redirect(`/ticket/${id}?msg=not_found`);
            }

            // Sukces
            res.redirect(`/ticket/${id}?msg=success`);

        } catch (err) {
            console.error('Błąd przy aktualizacji statusu:', err);
            res.redirect(`/ticket/${id}?msg=error`);
        }
    }

    async updateTicketPriority(req, res) {
        const { id } = req.params;
        const { priorytet_zgloszenia } = req.body;

        const allowedPriorities = ['low', 'medium', 'high'];

        // Walidacja
        if (!allowedPriorities.includes(priorytet_zgloszenia)) {
            return res.redirect(`/ticket/${id}?msg=invalid_priority`);
        }

        try {
            const conn = await pool.getConnection();

            const result = await conn.query(
                `UPDATE tickets 
             SET priorytet_zgloszenia = ? 
             WHERE id = ?`,
                [priorytet_zgloszenia, id]
            );

            conn.release();

            if (result.affectedRows === 0) {
                return res.redirect(`/ticket/${id}?msg=not_found`);
            }

            // Sukces
            res.redirect(`/ticket/${id}?msg=priority_success`);

        } catch (err) {
            console.error('Błąd przy aktualizacji priorytetu:', err);
            res.redirect(`/ticket/${id}?msg=error`);
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
const express = require('express')
const router = new express.Router()

router.get('/dashboard', (req, res) => {
    res.render('pages/dashboard/selectDepartment', {
        title: 'Wybór działu',
        navItems: ''
    });
});


const db = require('../database/dbConfig'); 


router.get('/dashboard/it', async (req, res) => {
  const tickets = await db.query(
    'SELECT * FROM tickets WHERE dzial_docelowy = ? AND status_zgloszenia = ? ORDER BY data_utworzenia DESC',
    ['it', 'new']
  );

  const countRows = await db.query(
    'SELECT COUNT(*) AS count FROM tickets WHERE status_zgloszenia = ?',
    ['new']
  );

  const countNewTickets = countRows[0].count;

const countRowsInProgres = await db.query(
    'SELECT COUNT(*) AS count FROM tickets WHERE status_zgloszenia = ?',
    ['in_progress']
  );

  const countInProgres = countRowsInProgres[0].count;


  const countRowsCritic = await db.query(
    'SELECT COUNT(*) AS count FROM tickets WHERE status_zgloszenia = ?',
    ['in_progress']
  );

  const countCritic = countRowsCritic[0].count;

    const countRowsDone = await db.query(
    'SELECT COUNT(*) AS count FROM tickets WHERE status_zgloszenia = ?',
    ['in_progress']
  );

  const countDone = countRowsDone[0].count;


  res.render('pages/dashboard/it', {
    title: 'Dział IT - Nowe zgłoszenia',
    navItems: '',
    layout: 'layouts/dashboardLayouts',
    tickets,
    countNewTickets,
    countInProgres,
    countCritic,
    countDone
  });
});



router.get('/dashboard/elektryczny', (req, res) => {
    res.render('pages/dashboard/electrical', {
        title: 'Dział Elektryczny',
        layout: 'layouts/dashboardLayouts',
        navItems: ''
    });
});

router.get('/dashboard/aparatura-medyczna', (req, res) => {
    res.render('pages/dashboard/medicalEquipment', {
        title: 'Dział Aparatury Medycznej',
        navItems: '',
        layout: 'layouts/dashboardLayouts'
    });
});

router.get('/dashboard/budowlany', (req, res) => {
    res.render('pages/dashboard/construction', {
        title: 'Dział Budowlany',
        navItems: '',
        layout: 'layouts/dashboardLayouts'
    });
});

router.get('/dashboard/cyberbezpieczenstwo', (req, res) => {
    res.render('pages/dashboard/cybersecurity', {
        title: 'Dział Cyberbezpieczeństwa',
        navItems: '',
        layout: 'layouts/dashboardLayouts'
    });
});


module.exports = router
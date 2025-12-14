const express = require('express')
const router = new express.Router()

router.get('/dashboard', (req, res) => {
    res.render('pages/dashboard/selectDepartment', {
        tittle: 'Wybór działu'
    });
});

router.get('/dashboard/it', (req, res) => {
    res.render('pages/dashboard/it', {
        tittle: 'Dział IT',
        layout: 'layouts/dashboardLayouts'
    });
});

router.get('/dashboard/elektryczny', (req, res) => {
    res.render('pages/dashboard/electrical', {
        tittle: 'Dział Elektryczny',
        layout: 'layouts/dashboardLayouts'
    });
});

router.get('/dashboard/aparatura-medyczna', (req, res) => {
    res.render('pages/dashboard/medicalEquipment', {
        tittle: 'Dział Aparatury Medycznej',
        layout: 'layouts/dashboardLayouts'
    });
});

router.get('/dashboard/budowlany', (req, res) => {
    res.render('pages/dashboard/construction', {
        tittle: 'Dział Budowlany',
        layout: 'layouts/dashboardLayouts'
    });
});

router.get('/dashboard/cyberbezpieczenstwo', (req, res) => {
    res.render('pages/dashboard/cybersecurity', {
        tittle: 'Dział Cyberbezpieczeństwa',
        layout: 'layouts/dashboardLayouts'
    });
});


module.exports = router


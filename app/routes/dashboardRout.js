const express = require('express')
const router = new express.Router()

router.get('/dashboard', (req, res) => {
    res.render('pages/dashboard/selectDepartment', {
        tittle: 'Wybór działu'
    });
});

router.get('/dashboard/it', (req, res) => {
    res.render('pages/dashboard/it', {
        tittle: 'Dział IT'
    });
});

router.get('/dashboard/elektryczny', (req, res) => {
    res.render('pages/dashboard/electrical', {
        tittle: 'Dział Elektryczny'
    });
});

router.get('/dashboard/aparatura-medyczna', (req, res) => {
    res.render('pages/dashboard/medicalEquipment', {
        tittle: 'Dział Aparatury Medycznej'
    });
});

router.get('/dashboard/budowlany', (req, res) => {
    res.render('pages/dashboard/construction', {
        tittle: 'Dział Budowlany'
    });
});

router.get('/dashboard/cyberbezpieczenstwo', (req, res) => {
    res.render('pages/dashboard/cybersecurity', {
        tittle: 'Dział Cyberbezpieczeństwa'
    });
});


module.exports = router


const express = require('express')
const router = new express.Router()
const globalController = require('../controllers/global-controller')

router.get('/', globalController.showHome)

router.get('/login', globalController.showLogin)



module.exports = router
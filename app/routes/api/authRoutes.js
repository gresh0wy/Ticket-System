const express = require('express')
const router = new express.Router()
const authController = require('../../controllers/auth-controllers');
const authMiddleware = require('../../middleware/auth-middleware')
const isAdmin = [authMiddleware.verifyToken, authMiddleware.checkAdmin]

router.post('/login', authController.login)

router.post('/register', authController.register)

router.delete('/users/:id', isAdmin, authController.delete)


// nalezy testowac oraz dodac uniewaznienie tokena
router.post('/logout', authController.logout)


// trzeba jeszcze dodac dynamiczne zapytanie sql
router.patch('/users/:id', isAdmin, authController.edit)

module.exports = router

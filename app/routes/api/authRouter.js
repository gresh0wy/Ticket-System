require('dotenv').config();
const express = require('express')
const router = new express.Router()
const pool = require('../../database/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post('/auth/login', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ error: 'Brakuje wymaganych pól' })
    }

    // token JWT_SECRET
    try {
        const [row] = await pool.query(
            'SELECT * FROM users WHERE username = ?',
            [username])

        if (row.length === 0) {
            return res.status(401).json({ message: 'Nieprawidłowe dane logowania' })
        }

        const user = row[0] //przypisujemy do usera obiekt użytkownika
        const isMatch = await bcrypt.compare(password, user.password) //sprawdzenie czy hasło się zgadza

        const token = jwt.sign({ id: user.id, admin: user.is_admin }, process.env.JWT_SECRET, { expiresIn: 1200 })

        if (isMatch) {
            return res.status(200).json({ message: 'pomyślnie zalogowano', token: token })
        } else {
            return res.status(401).json({ error: 'nieprawidłowe dane logowania' })
        }

    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' })
    }


})

router.post('/auth/register', async (req, res) => {
    const { imie, nazwisko, username, password, email } = req.body
    if (!imie || !nazwisko || !username || !password || !email) {
        return res.status(400).json({ error: 'Brakuje wymaganych pól' })
    }
    //usuwanie białych znaków
    const firstName = imie.trim()
    const lastName = nazwisko.trim()
    const newUsername = username.trim()
    const newEmail = email.trim()


    // weryfikacja poprawności email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Nieprawidłowy email' })
    }


    // walidacja  długośści znaków
    if (newUsername.length < 3) {
        return res.status(400).json({ message: 'Minimalna liczba znaków dla username to 3' })
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Minimalna liczba znaków dla hasła to 8' })
    }




    // wysyłanie zapytania
    try {
        // haszowanie
        const hashPass = await bcrypt.hash(password, 10)
        const [row] = await pool.query(
            'INSERT INTO users (imie, nazwisko, username, password, email) VALUES (?,?,?,?,?)',
            [firstName, lastName, newUsername, hashPass, newEmail]
        )
        res.status(201).json({ message: "pomyślnie stworzono użytkownika" })
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Użytkownik z takim emailem lub username już istnieje' })
        }
        res.status(500).json({ error: 'Błąd serwera' })
    }
})

module.exports = router
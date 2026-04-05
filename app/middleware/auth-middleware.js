const jwt = require('jsonwebtoken')
require('dotenv').config();

class authMiddleware {
    verifyToken(req, res, next) {
        const token = req.cookies.authToken
        if (!token) {
            return res.status(401).json({ message: 'brak dostępu' })
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()
        } catch (error) {
            return res.status(403).json({ error: 'Nieprawidłowy token' })
        }
    }
    checkAdmin(req, res, next) {
        const token = req.cookies.authToken
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        if (req.user.admin = 0) {
            return res.status(403).json({ message: "wymagane uprawnienia na poziomie administratora" })
        }
        next()
    }
}

module.exports = new authMiddleware()
const express = require('express')
const userRoutes = require('./api/user/user.route')
const authRoutes = require('./api/auth/auth.route')

const router = express.Router()

// check service health at /health-check
router.get('/health-check', (req, res) => res.send('OK'))

// mount user routes at /users
router.use('/users', userRoutes)

// mount authentication routes at /auth
router.use('/auth', authRoutes)

module.exports = router

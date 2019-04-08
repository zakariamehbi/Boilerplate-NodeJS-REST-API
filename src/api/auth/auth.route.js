const express = require('express')
const validate = require('express-validation')
const authValidation = require('./auth.validation')
const authCtrl = require('./auth.controller')

const router = express.Router()

router
	.route('/login')
	.post(validate(authValidation.loginSchema), authCtrl.login)

module.exports = router

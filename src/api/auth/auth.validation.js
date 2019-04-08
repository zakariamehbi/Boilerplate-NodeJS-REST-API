const Joi = require('joi')

module.exports = {
	// POST /api/auth/login
	loginSchema: {
		body: {
			email: Joi.string().required(),
			password: Joi.string().required()
		}
	}
}

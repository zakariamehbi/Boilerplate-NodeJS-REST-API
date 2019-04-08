const Joi = require('joi')

module.exports = {
	// POST /api/users
	createUserSchema: {
		body: {
			email: Joi.string().required(),
			password: Joi.string().required(),
			mobileNumber: Joi.string()
				.regex(/^[1-9][0-9]{9}$/)
				.required()
		}
	},

	// UPDATE /api/users/:userId
	updateUserSchema: {
		body: {
			email: Joi.string().required(),
			password: Joi.string().required(),
			mobileNumber: Joi.string()
				.regex(/^[1-9][0-9]{9}$/)
				.required()
		},
		params: {
			userId: Joi.string()
				.hex()
				.required()
		}
	}
}

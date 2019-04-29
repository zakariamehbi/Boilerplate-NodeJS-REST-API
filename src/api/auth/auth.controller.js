const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const User = require('../user/user.model')

exports.login = (req, res, next) => {
	const { email, password } = req.body

	User.findByCredentials(email, password)
		.then(user => {
			const token = jwt.sign({ _id: user._id }, config.jwtSecret)

			return res.json(token)
		})
		.catch(e => {
			next(e)
		})
}

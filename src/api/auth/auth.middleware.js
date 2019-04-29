const jwt = require('jsonwebtoken')
const config = require('../../config/config')

module.exports = (req, res, next) => {
	// Express headers are auto converted to lowercase
	let token = req.headers.authorization

	if (typeof token !== 'undefined' && token.startsWith('Bearer ')) {
		// Remove Bearer from string
		token = token.slice(7, token.length)

		jwt.verify(token, config.jwtSecret, (err, decoded) => {
			if (typeof decoded !== 'undefined') {
				console.log(`The token provided by the user ${decoded._id} is valid`)

				return next()
			}

			return res.status(401).send(err)
		})
	} else {
		res.status(401).send()
	}
}

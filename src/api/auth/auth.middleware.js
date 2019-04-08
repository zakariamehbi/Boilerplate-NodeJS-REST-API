const jwt = require('jsonwebtoken')
const config = require('../../config/config')

module.exports = (req, res, next) => {
	// Express headers are auto converted to lowercase
	let token = req.headers['authorization'];

	if (token !== undefined && token.startsWith('Bearer ')) {
		// Remove Bearer from string
		token = token.slice(7, token.length)

		jwt.verify(token, config.jwtSecret, (err, decoded) => {
			if (decoded !== undefined) {
				console.log(`The token provided by the user ${decoded._id} is valid`)
				next()
			} else {
				res.status(401).send()
			}
		})
	} else {
		res.status(401).send()
	}
}

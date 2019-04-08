const { ObjectID } = require('mongodb')
const User = require('./user.model')

/**
 * Load the user and append it to req
 * every time an id is given /users/:id
 */
// eslint-disable-next-line consistent-return
exports.load = (req, res, next, id) => {
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	User.get(id)
		.then(user => {
			req.user = user

			return next()
		})
		.catch(e => next(e))
}

/**
 * Get user
 */
exports.get = (req, res) => res.json(req.user)

/**
 * Create new user
 */
exports.create = (req, res, next) => {
	const user = new User({
		email: req.body.email,
		password: req.body.password,
		mobileNumber: req.body.mobileNumber
	})

	user
		.save()
		.then(savedUser => res.json(savedUser))
		.catch(e => next(e))
}

/**
 * Update existing user
 */
exports.update = (req, res, next) => {
	const { user } = req

	user.username = req.body.username
	user.password = req.body.password
	user.mobileNumber = req.body.mobileNumber

	user
		.save()
		.then(savedUser => res.json(savedUser))
		.catch(e => next(e))
}

/**
 * Get user list
 */
exports.list = (req, res, next) => {
	const { limit = 50, skip = 0 } = req.query

	User.list({limit, skip})
		.then(users => res.json(users))
		.catch(e => next(e))
}

/**
 * Delete user
 */
exports.remove = (req, res, next) => {
	const { user } = req

	user
		.remove()
		.then(deletedUser => res.json(deletedUser))
		.catch(e => next(e))
}

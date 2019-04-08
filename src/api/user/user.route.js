const express = require('express')
const validate = require('express-validation')
const userValidation = require('./user.validation')
const userCtrl = require('./user.controller')
const authMiddleware = require('../auth/auth.middleware')

const router = express.Router()

/**
 * https://expressjs.com/en/guide/using-middleware.html
 *
 * Implementation methods of a middleware
 *
 * router.use(authMiddleware)
 *
 * router.route('/')
 * 	.all((req, res, next) => {
 * 		authMiddleware(req, res, next)
 * 		next()
 * 	})
 *
 * router
 *	.route('/')
 *	.get(authMiddleware, userCtrl.list)
 */

router.use(authMiddleware)

router
	.route('/')

	/** GET /api/users - Get list of users */
	.get(userCtrl.list)

	/** POST /api/users - Create new user */
	.post(validate(userValidation.createUserSchema), userCtrl.create)

/** Load user when API with id route parameter is hit */
router.param('id', userCtrl.load)

router
	.route('/:id')

	/** GET /api/users/:id - Get user */
	.get(userCtrl.get)

	/** PUT /api/users/:id - Update user */
	.put(validate(userValidation.updateUserSchema), userCtrl.update)

	/** DELETE /api/users/:id - Delete user */
	.delete(userCtrl.remove)

module.exports = router

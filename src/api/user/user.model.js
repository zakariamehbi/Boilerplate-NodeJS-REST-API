/* eslint-disable no-invalid-this */
const Promise = require('bluebird')
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const bcrypt = require('bcrypt')
const validator = require('validator')

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		/*
		 * You can also make a validator async by returning a promise. If you
		 * return a promise, do **not** specify the `isAsync` option.
		 */
		validate: {
			validator: validator.isEmail,
			// eslint-disable-next-line no-undef
			message: '{VALUE} is not a valid email'
			/*
			 * Equivalent
			 * validator: value => {
			 * return validator.isEmail(value)
			 * }
			 */
		}
	},
	password: {
		type: String,
		required: true
	},
	mobileNumber: {
		type: String,
		required: true,
		match: [
			/^[1-9][0-9]{9}$/,
			'The value of path {PATH} ({VALUE}) is not a valid mobile number.'
		]
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

/**
 * Add your
 * - methods
 * - statics
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({})

/**
 * Statics
 */
UserSchema.statics = {
	get(id) {
		return this.findById(id)
			.exec()
			.then(user => {
				if (user) {
					return user
				}

				return Promise.reject(new Error('User not found', httpStatus.NOT_FOUND))
			})
	},

	list({ skip = 0, limit = 50 } = {}) {
		return this.find()
			.sort({ createdAt: -1 })
			.skip(Number(skip))
			.limit(Number(limit))
			.exec()
	},

	findByCredentials(email, password) {
		return this.findOne({ email }).then(user => {
			if (!user) {
				return Promise.reject(new Error('User not found', httpStatus.NOT_FOUND))
			}

			return new Promise((resolve, reject) => {
				// https://stackoverflow.com/questions/13023361/how-does-node-bcrypt-js-compare-hashed-and-plaintext-passwords-without-the-salt
				bcrypt.compare(password, user.password, (err, res) => {
					if (res) {
						console.log('resolve')
						resolve(user)
					} else {
						console.log('reject')
						reject(err)
					}
				})
			})
		})
	}
}

/**
 * Pre-save hooks
 */
UserSchema.pre('save', next => {
	if (this.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				console.log(err)
			} else {
				bcrypt.hash(this.password, salt, (err2, hash) => {
					if (err2) {
						console.log(err2)
					}

					this.password = hash
				})
			}
		})
	}

	return next()
})

module.exports = mongoose.model('User', UserSchema)

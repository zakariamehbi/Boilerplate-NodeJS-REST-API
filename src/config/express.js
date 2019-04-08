const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const methodOverride = require('method-override')
const helmet = require('helmet')
const cors = require('cors')
const httpStatus = require('http-status')
const createError = require('http-errors')

const { env } = require('./config')
const routes = require('../index.route')

const app = express()

if (env === 'development') {
	// request logging. dev: console | production: file
	app.use(logger('dev'))
}

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// parse cookie header and attache them to req.cookies
app.use(cookieParser())

// gzip compression
app.use(compress())

/*
 * lets you use HTTP verbs such as PUT or DELETE
 * in places where the client doesn't support it
 */
app.use(methodOverride())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// mount all routes on /api path
app.use('/api', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
	if (env === 'development') {
		return next(createError(404))
	}

	return res.status(404).json({ message: httpStatus[404] })
})

// error handler, send stacktrace only during development
/*
 * app.use((
 * err,
 * req,
 * res,
 * next // eslint-disable-line no-unused-vars
 * ) =>
 * res.status(err.status).json({
 * message: err.isPublic ? err.message : httpStatus[err.status],
 * stack: env === 'development' ? err.stack : {}
 * })
 * )
 */

module.exports = app

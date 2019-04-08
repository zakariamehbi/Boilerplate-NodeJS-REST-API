const mongoose = require('mongoose')
const { mongo, env } = require('./config')

// set mongoose Promise to Bluebird
mongoose.Promise = Promise

// exit application on error
mongoose.connection.on('error', err => {
	throw new Error(`MongoDB connection error: ${err}`)
	// process.exit(-1)
})

// print mongoose logs in dev env
if (env === 'development') {
	mongoose.set('debug', true)
}

// connect to mongo db
exports.connect = () => {
	mongoose.connect(mongo.host, {
		keepAlive: 1,
		useNewUrlParser: true
	})

	return mongoose.connection
}

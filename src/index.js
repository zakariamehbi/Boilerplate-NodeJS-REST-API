// make bluebird default Promise
// eslint-disable-next-line no-global-assign
Promise = require('bluebird')

// config should be imported before importing any other file
const { port, env } = require('./config/config')
const mongoose = require('./config/mongoose')
const app = require('./config/express')
const logger = require('./config/logger')

// open mongoose connection
mongoose.connect()

// listen for connections
app.listen(port, () => {
	logger.info(`server started on port ${port} (${env})`)
})

module.exports = app

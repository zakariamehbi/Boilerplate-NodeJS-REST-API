const winston = require('winston')

// eslint-disable-next-line no-process-env
const level = process.env.LOG_LEVEL || 'debug'

const logger = new winston.Logger({
	transports: [
		new winston.transports.Console({
			level,
			timestamp() {
				return new Date().toISOString()
			}
		})
	]
})

module.exports = logger

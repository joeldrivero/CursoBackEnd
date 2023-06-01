const winston = require("winston");

const logger = winston.createLogger({
    transports: [new winston.transports.Console({ level: "http" })]
})

const addlogger = (req, res, next) => {
    req.logger = logger
    req.logger.http(`${req.method} en ${req.url}`)

    next()
}

module.exports = addlogger
const { promisify } = require('util')
const http = require('http')
const logger = require('winston')
const app = require('./server')
const config = require('./config/server')

const server = http.createServer(app.callback())
const serverListen = promisify(server.listen).bind(server)

serverListen(config.port)
  .then(() => {
    logger.info(`User service is up and running on localhost:${config.port}`)
  })
  .catch(err => {
    logger.error(err)
    process.exit(1)
  })

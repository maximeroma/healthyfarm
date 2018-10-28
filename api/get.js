const UserService = require('../services/user')
const logger = require('winston')

module.exports = config => ({
  getAll: async ctx => {
    try {
      const users = await UserService.getAllUser()
      ctx.body = { users }
      ctx.status = 201
    } catch (err) {
      logger.err(`[GET:getAll]: ${err}`)
      ctx.status = 500
    }
  }
})

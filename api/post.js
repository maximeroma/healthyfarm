const logger = require('winston')
const UserService = require('../services/user')
const { hashPassword } = require('../utils/hashPassword')

const register = async ctx => {
  try {
    const credentials = {
      username: ctx.request.body.username,
      email: ctx.request.body.email,
      password: await hashPassword(ctx.request.body.password)
    }
    await UserService.insert(credentials)
    ctx.body = {
      message: 'User successfully registered'
    }
    ctx.status = 201
  } catch (err) {
    logger.error(`register ${err}`)
    ctx.status = 500
  }
}

const login = async ctx => {}

module.exports = {
  register,
  login
}

const logger = require('winston')
const UserService = require('../services/user')
const { hashPassword } = require('../utils/hashPassword')
const jwt = require('jsonwebtoken')
const { validate } = require('../models')

module.exports = config => ({
  register: async ctx => {
    try {
      const reqBody = await validate(
        {
          username: ctx.request.body.username,
          email: ctx.request.body.email,
          password: ctx.request.body.password
        },
        'register'
      )

      const registerCredentials = {
        password: await hashPassword(reqBody.password),
        username: reqBody.username,
        email: reqBody.email
      }

      await UserService.insert(registerCredentials)

      ctx.body = {
        message: 'User successfully registered'
      }
      ctx.status = 201
    } catch (err) {
      logger.error(`register ${err}`)
      ctx.status = 500
    }
  },

  login: async ctx => {
    const loginCredentials = {
      email: ctx.response.body.email,
      password: ctx.response.body.password
    }

    try {
      const result = await UserService.getLogin(loginCredentials.email)
      if (!result) {
        ctx.status = 401
        return
      }
      const isPasswordValid = bcrypt.compare(
        loginCredentials.password,
        result.password
      )
      if (!isPasswordValid) {
        ctx.status = 401
        return
      }
      const token = jwt.sign(
        { id: result.id, isAdmin: result.isAdmin },
        config.tokenSecret,
        {
          expiresIn: config.tokenExpiration
        }
      )
      ctx.body = {
        token,
        message: 'Successfully logged in',
        user: {
          username: result.username,
          email: result.email,
          admin: result.isAdmin
        }
      }
      return
    } catch (err) {
      logger.error(500)
      ctx.status = 500
    }
  }
})

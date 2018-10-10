const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const { register } = require('./post')

const router = new Router()

router.use(bodyParser())

router.get('/healthcheck', ctx => {
  ctx.body = 'Users service is up!'
})

router.post('/register', register)

module.exports = router

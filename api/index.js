const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const config = require('../config/server')
const PostUser = require('./post')(config)
const GetUser = require('./get')(config)

const router = new Router()

router.use(bodyParser())

router.get('/healthcheck', ctx => {
  ctx.body = 'Users service is up!'
})

router.post('/register', PostUser.register)
router.post('/login', PostUser.login)
router.get('/users', GetUser.getAll)

module.exports = router

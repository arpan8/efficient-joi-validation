const express = require('express')
const router = express.Router()
const user = require('./user.routes')

const routes = [
  user
]

routes.forEach(route => {
  router.use(route)
})

module.exports = router
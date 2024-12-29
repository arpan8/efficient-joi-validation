const express = require('express')
const router = express.Router()

const { register } = require('../controllers/user.controllers')
const { validateRequest } = require('../middlewares/validationRequest')
const { registerSchemaValidation } = require('../validations/user.validation')

router.post('/register', validateRequest({ body: registerSchemaValidation}), register)

module.exports = router

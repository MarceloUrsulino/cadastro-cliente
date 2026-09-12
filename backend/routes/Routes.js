const router = require('express').Router()
const ClienteController = require('../controllers/ClienteController')


router.post('/cliente', ClienteController.ClienteCreate)


module.exports = router
